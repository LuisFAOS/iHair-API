import database from "../libs/knex"
import salonServiceSchema from "../validations/schemas/salonService.schema"

import {v4 as uuid} from 'uuid'
import base64Schema from "../validations/schemas/base64.schema";

export default class SalonService{
     name: string;
     description: string;
     price: number;
     avg_time: number;
     #img_model_URL?: string;

     constructor(name: string, description: string, price: number, avg_time: number){
          this.name = name;
          this.description = description;
          this.price = price;
          this.avg_time = avg_time;
          this.#img_model_URL;
     }

     async setImgModel(img_model_base64){
          // insert on cloud file storage
     }

     async addToDB(_salon_id: string){
          await database("salon_service")
                    .insert({
                         id: uuid().toString(),
                         ...this,
                         img_model_URL: this.#img_model_URL,
                         _salon_id,
                    })
     }

     static async getFromDB(whereProps: object){
          const salon_services = await database("salon_service")
                    .select("*")
                    .where({
                         ...whereProps
                    })

          return salon_services
     }

     static async updateInDB(updatedSalonService: object, whereProps: object){
          await database("salon_service")
                    .update({
                         ...updatedSalonService
                    })
                    .where({
                         ...whereProps
                    })
     }

     static async deleteFromDB(whereProps: object){
          await database('salon_service')
                    .delete()
                    .where({
                         ...whereProps
                    })
     }

     static async validate(salon_services: Array<any>, isUpdating?: boolean){
          try {
               salon_services.forEach(async salon_service => {

                    if(!isUpdating && salon_service.img_model_base64){
                         await base64Schema.validate({
                              file_base64: salon_service.img_model_base64
                         })
                    }

                    await salonServiceSchema.validate({
                         ...salon_service
                    })
               })
          } catch (error) {
               return error.message
          }
     }
}
