import {
     v4 as uuid
} from 'uuid'
import cepPromise from "cep-promise"
import {
     cnpj
} from "cpf-cnpj-validator"

import database from "../libs/knex"
import {joined_schemas,splitted_schemas} from "../validations/schemas/salon.schema"
import base64Schema from "../validations/schemas/base64.schema"

export default class Salon{
     name: string;
     contact_phone: string;
     salon_description: string;
     type_service: string;
     #banner_URL: string;

     CEP: string;
     address_number: string;
     CNPJ: string;
     _salon_owner_id: string;


     constructor(name: string, contact_phone: string, CEP: string, address_number: string, 
               CNPJ: string, salon_description: string, type_service: string, 
               _salon_owner_id: string){

          this.name = name;
          this.contact_phone = contact_phone;
          this.CEP = CEP;
          this.address_number = address_number; 
          this.CNPJ = CNPJ;
          this.salon_description = salon_description;
          this.type_service = type_service;
          this._salon_owner_id = _salon_owner_id;
     }

     async setBannerURL(bannerURL: string){
          this.#banner_URL=bannerURL
     }

     get bannerURL(){
          return this.#banner_URL
     }

     async addToDB(){
          await database("salon").insert({
               id: uuid().toString(),
               ...this,
               banner_URL: this.#banner_URL || 'teste.com',
               createdAt: new Date(),
          })
     }

     static async addSalonImgsToDB(salonImgsURL: Array<string>, _salon_id: string){
          salonImgsURL.forEach(async url => {
               await database("salonImgs").insert({
                    url,
                    _salon_id
               })
          })
     }

     static async getAllSalonsFromDB(){
          const salons = await database("salon")
                                   .select('*')
                                   .where({is_verified: true})
          return salons
     }

     static async getFromDB(whereProps:object){
          const salon = await database("salon")
               .select('*').where({
                    ...whereProps
               })

          return salon[0]
     }

     static async updateInDB(updatedData: object, whereProps: object) {
          await database("salon")
               .update({
                    ...updatedData
               })
               .where({
                    ...whereProps
               })
     }

     static async validate
          (salon_data: {
               name: string,
               type_service: string,  
               salon_description: string,
               contact_phone?: string,
               address_number?: string,
               CEP?: string, 
               CNPJ?: string,
          }, banner_img_base64?: string, isUpdate?: boolean){
               try {
                    if(banner_img_base64){
                         const matches_blob_img = banner_img_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

                         await base64Schema.validate({
                              file_base64: matches_blob_img[2]
                         })
                    }
                    
                    if(isUpdate){ 
                         const schemas = {
                              CEP: {
                                   validate: () => cepPromise(salon_data.CEP)
                              },
                              CNPJ: {
                                   validate: async () => {
                                        const isValidCNPJ = await cnpj.isValid(salon_data.CNPJ)
                                        if(!isValidCNPJ) throw new Error('CNPJ inválido!')
                                   }
                              },
                              type_service: {
                                   validate: () => {
                                        if(!['Cabeleireiro(a)', 'Barbeiro', 'Geral', 'Manicure'].includes(salon_data.type_service)){
                                             throw new Error("Esse tipo de serviço não existe")
                                        }
                                   }
                              },
                              ...splitted_schemas
                         }

                         for (const [keys, values] of Object.entries(salon_data)) {
                              schemas[keys].validate({
                                   value: values
                              })
                         }

                         return
                    }

                    await joined_schemas.validate({
                         ...salon_data,
                    })
               } catch (error) {
                    return error.message
               }
     }
}
