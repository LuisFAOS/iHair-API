import database from "../libs/knex";

import businessHoursSchema from "../validations/schemas/salonBusinessHours.schema";

import {
     v4 as uuid
} from "uuid"

export default class BusinessHours {
     week_periods: Array<{ day_periods: string[][] | "FECHADO", week_day_index?: number}>;
     _salon_id: string;

     constructor(week_periods: Array<{ day_periods: string[][] | "FECHADO", week_day_index: number | undefined }>, _salon_id: string) {
          this.week_periods = week_periods;
          this._salon_id = _salon_id;
     }

     private format_week_periods(): Array<string> {
          const formatted_week_periods = this.week_periods.map(({ day_periods }): string => {
                if (Array.isArray(day_periods)) {
                    const reducer = (accumulator, current_value: string[], i): string => {
                         return (
                              accumulator +
                              current_value.join(" às ") +
                              (i + 1 < day_periods.length ? " - " : "")
                         );
                    };
                    return day_periods.reduce(reducer, "");
               }
               return day_periods;
          });

          return formatted_week_periods;
     }

     async addToDB(): Promise<void> {

          /** @example 00:00 às 08:00 - 14:00 às 22:00 */

          const formatted_week_periods = this.format_week_periods();

          formatted_week_periods.forEach(async (formatted_day_periods, week_day_index) => {
                await database("business_hours").insert({
                    week_day_index,
                    day_periods: formatted_day_periods,
                    _salon_id: this._salon_id,
                    id: uuid().toString(),
               });
          });
     }

     static async getFromDB(whereProps: Object) {
          const business_hours = await database("business_hours")
               .select("*")
               .where({
                    ...whereProps,
               });

          return business_hours;
     }

     static async existInDB(whereProps: Object): Promise<string | void> {
          const possible_business_hours_data = await this.getFromDB(whereProps);

          if (possible_business_hours_data[0])
               return "Você já cadastrou os horários de funcionamento!";
     }

     async updateInDB(whereProps: Object): Promise<void> {
          const formatted_week_periods = this.format_week_periods();

          formatted_week_periods.forEach(async (formattedday_periods, i) => {
               await database("business_hours")
                    .update({
                         day_periods: formattedday_periods,
                         _salon_id: this._salon_id,
                    })
                    .where({
                         ...whereProps,
                         week_day_index: this.week_periods[i].week_day_index,
                    });
          });
     }

     async validate(isUpdating?: boolean): Promise<string | void> {
          try {

               if (!isUpdating && this.week_periods.length !== 7) {
                    return "É necessário preencher todas os dias da semana!";
               }

               for (const periods of this.week_periods) {
                    if (isUpdating && typeof periods.week_day_index !== 'number' && periods.week_day_index < 0 && periods.week_day_index > 6) {
                         return "Dados inválidos. Atualização falhou!"
                    }

                    if (!(periods.day_periods === "FECHADO") && Array.isArray(periods.day_periods)) {

                         for (const y in periods.day_periods) {
                              const period = periods.day_periods[y];
                              //period has start and end schedule, however two parts
                              if (period.length !== 2) {
                                   return `Periodo inválido.`;
                              }

                              //verification time(hour:minute)
                              for (const i in period) {
                                   const index_time = parseInt(i);
                                   const time = period[i];

                                   await businessHoursSchema.validate({
                                        time
                                   })

                                   const hour = parseInt(time.split(":")[0]);
                                   const minute = parseInt(time.split(":")[1]);

                                   if (hour < 0 || hour > 23 || minute < 0 || minute > 63) {
                                        return "Horário inválida.";
                                   }

                                   let last_hour, last_minute;
                                   if (index_time === 0 && y !== "0") {
                                        last_hour = parseInt(periods.day_periods[parseInt(y) - 1][1].split(":")[0]);
                                        last_minute = parseInt(
                                             periods.day_periods[parseInt(y) - 1][1].split(":")[1]
                                        );
                                   } else if (index_time > 0) {
                                        last_hour = parseInt(period[index_time - 1].split(":")[0]);
                                        last_minute = parseInt(period[index_time - 1].split(":")[1]);
                                   }
                                   //checking if current time is less than last time(invalid period)
                                   if (last_hour > hour || (last_hour === hour && last_minute > minute)) {
                                        return `Periodo inválido`;
                                   }
                              }
                         }
                    } else if (typeof periods === "string" && periods !== "FECHADO")
                         return "Periodo inválido.";
               }
          } catch (error) {
               return error.message;
          }
     }
}
