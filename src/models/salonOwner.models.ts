import database from "../libs/knex"
import base64Schema from "../validations/schemas/base64.schema"
import {joined_schemas,splited_schemas} from "../validations/schemas/salonOwner.schema"

import bcrypt from "bcryptjs"
import {
     v4 as uuid
} from 'uuid'

interface iGetFilteredDataReturn {
     complete_name: string, 
     id: string,
     phone: string, 
     email: string, 
     profile_img_URL: string, 
     certificate_file_URL: string, 
     created_at: string | Date,
}

interface iGetSensitiveDataReturn{
     password_hashed: string,
     has_salon: string,
     is_verified: string,
     email_token: string,
     _denunciation_id: string,
}

export default class SalonOwner{

     complete_name: string;
     phone: string;
     email: string;
     #password_hashed: string;
     #profile_img_URL: string;
     #certificate_file_URL: string;

     constructor(complete_name: string, phone: string, email: string){

          this.complete_name = complete_name;
          this.phone = phone;
          this.email = email;
     }

     async setProfileImg(profile_img_base64: string){
          //insert on cloud file storage
     }

     async setCertificateFile(certificate_file_base64: string){
          //insert on cloud file storage
     }

     async setPassword(password: string){
          this.#password_hashed = await bcrypt.hash(password, 10)
     }

     get password_hashed(){
          return this.#password_hashed
     }

     getPrivateFields(){
          return {
               password_hashed: this.#password_hashed,
               profile_img_URL: this.#profile_img_URL,
               certificate_file_URL: this.#certificate_file_URL
          }    
     }

     async addToDB(email_token: string){
          await database("salon_owner")
               .insert({
                    id: uuid().toString(),
                    ...this,
                    ...this.getPrivateFields(),
                    created_at: new Date(),
                    email_token,
                    profile_img_URL: 'teste.com.br'
               })
     }

     static async getFilteredDataFromDB(whereProps: object):Promise<iGetFilteredDataReturn>{
          const salon_owner_filtered_data = await database('salon_owner')
               .select("complete_name", 
                         "id",
                         "phone", 
                         "email", 
                         "profile_img_URL", 
                         "certificate_file_URL", 
                         "created_at")
               .where({
                    ...whereProps
               })
          
          return salon_owner_filtered_data[0]
     }

     static async getAllDataFromDB(whereProps: object): Promise<iGetFilteredDataReturn & iGetSensitiveDataReturn>{
          const salon_owner_all_data = await database("salon_owner")
               .select("*")
               .where({
                    ...whereProps
               })

          return salon_owner_all_data[0];
     }

     static async updateInDB(updated_salon_owner_data, whereProps: object){
          await database('salon_owner')
               .update({
                    ...updated_salon_owner_data
               })
               .where({
                    ...whereProps
               })
     }

     static async validate(salon_data, files?: {profile_img_base64?: string, certificate_file_base64?: string}, isUpdating?: boolean){
          try {
               const schemas = {
                    ...splited_schemas,
                    all: joined_schemas,
               }

               if(files){
                    const matches_blobs = []
                    files.certificate_file_base64 && matches_blobs.push(files.certificate_file_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/))
                    matches_blobs.push(files.profile_img_base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/))
                    matches_blobs.forEach(async (matches_blob, i) => {
                         await base64Schema.validate({
                              imgInBase64: matches_blob[i][2]
                         })
                    })
               }

               if(isUpdating){
                    for (const [keys, values] of Object.entries(salon_data)){
                         await schemas[keys].validate({
                              value: values
                         })
                    }

                    return
               }
               await schemas.all.validate({
                    ...salon_data
               })
          } catch (error) {
               return error.message
          }
     }
}
