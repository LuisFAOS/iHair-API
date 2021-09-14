import database from "../libs/knex"
import normalUserSchema from "../validations/schemas/normalUser.schema"

import bcrypt from "bcryptjs"
import cepPromise from "cep-promise"
import {
     v4 as uuid
} from "uuid"

export default class NormalUser{
     name: string;
     CEP: string;
     email: string;
     #password_hashed: string;

     constructor(name: string, CEP: string, email: string){
          this.name = name;
          this.CEP = CEP;
          this.email = email;
          this.#password_hashed = '';
     }

     async setPassword(password: string){
          this.#password_hashed = await bcrypt.hash(password, 10)
     }

     get password_hashed(){
          return this.#password_hashed
     }

     async addToDB(email_token: string){
          await database("normal_user").insert({
               id: uuid().toString(),
               ...this, 
               password_hashed: this.#password_hashed,
               created_at: new Date(),
               email_token
          })
     }

     static async deleteFromDB(whereProps: object) {
          await database("normal_user")
               .delete().where({
                    ...whereProps
               })
     }

     static async getFilteredDataFromDB(whereProps: object) {
          const normal_user = await database("normal_user")
               .select(
                    'id',
                    'name',
                    'email',
                    'CEP',
                    'is_verified',
                    'created_at'
               )
               .where({
                    ...whereProps
               })
          
          return normal_user[0];
     }

     static async getAllDataFromDB(whereProps: object) {
          const normal_user = await database("normal_user")
               .select("*")
               .where({
                    ...whereProps
               })
          
          return normal_user[0];
     }

     async updateInDB(whereProps: object) {
          await database("normal_user")
               .update({
                    name: this.name,
                    CEP: this.CEP
               })
               .where({
                    ...whereProps
               })
     }

    static newPassword(){
        return {
            validate: (newPassword: string) => {
                if(newPassword.length < 6) return "A senha tem que ter no mínimo 6 dígitos!"
                if(newPassword.length > 40) return "A senha deve ter no máximo 40 caracters!"
            },
            hash: async (newPassword: string) => await bcrypt.hash(newPassword, 10),
            saveNewPasswordInDB: async (newPassword_hashed: string, verification_code: string, email: string) => {
                try{
                    await database("normal_user")
                        .update({password: newPassword_hashed})
                        .where({verification_code, email})
        
                    return {status: 200, message: "Senha atualizada com sucesso!"}
                }catch(err){
                    console.log(err)
                    return {status: 400, message: "Verifica se seu código foi digitado corretamente!"}
                }
            }
        }
    }
     
     //default password value only is to update
    async validate(password="*********"):Promise<string> {
        try {
            await normalUserSchema.validate({
                ...this,
                password
            })
            await cepPromise(this.CEP)
        } catch (error) {
            return error.message
        }
     }
}
