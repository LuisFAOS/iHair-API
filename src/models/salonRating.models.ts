import database from '../libs/knex'

import {v4 as uuid} from 'uuid'
import salonRatingSchema from '../validations/schemas/salonRating.schema';

interface iRating{
    general: number,
    comment?: string,
    reception?: number,
    is_salon_clean?: boolean,
    salon_gadgets?: number,
    service_quality?: number,
    chance_disclose?: number, 
}

export default class salonRating implements iRating{

    general: number;
    salon_gadgets?: number;
    reception?: number;
    service_quality?: number;
    chance_disclose?: number; 
    comment?: string;
    is_salon_clean?: boolean;

    constructor(rating: iRating){
        this.general = rating.general
        this.reception = rating.reception
        this.is_salon_clean = rating.is_salon_clean
        this.salon_gadgets = rating.salon_gadgets
        this.service_quality = rating.service_quality
        this.comment = rating.comment
        this.chance_disclose = rating.chance_disclose
    }

    async addToDB(_salon_id: string, _normal_user_id: string){
        await database('salon_rating')
                .insert({
                    id: uuid().toString(),
                    ...this
                })
    }

    static async getFromDB(whereProps: object){
        const salon_rating = await database("salon_rating")
                .select("*")    
                .where({
                    ...whereProps
                })

        return salon_rating
    }

    static async getAvgGeneralRatingFromDB(whereProps: object){
        const general_rating_avg = await database("salon_rating")
                .avg('general as general_avg')   
                .where({
                    ...whereProps
                })

        return general_rating_avg[0]
    }

    static async validate(numeric_ratings, comment?: string){
        try {
            Object.values(numeric_ratings).forEach(async numeric_rating => {
                await salonRatingSchema.validate({general: numeric_ratings.general, comment, numeric_rating})
            })
        } catch (error) {
            return error.message
        }
    }
}
