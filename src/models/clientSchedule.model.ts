import database from "../libs/knex"

import * as Yup from 'yup';

import {
    v4 as uuid
} from "uuid"


export default class ClientSchedule {
    date: Date;
    _salon_id: string;
    _salon_service_id: string;
    _normal_user_id: string;
    #status: string;

    constructor(date: Date, _salon_id: string, _salon_service_id: string, _normal_user_id: string) {

        this.date = date;
        this._salon_id = _salon_id;
        this._salon_service_id = _salon_service_id;
        this._normal_user_id = _normal_user_id;

        this.#status = 'EM ABERTO';
    }

    setStatus(status: string) {
        if (['EM ABERTO', 'FECHADO', 'CANCELADO', 'FALTOU'].includes(status)) {
            this.#status = status
            return
        }

        return "status inválido! valores válido -> ['EM ABERTO', 'FECHADO', 'CANCELADO', 'FALTOU']"
    }

    getStatus(): string {
        return this.#status
    }

    async addToDB() {
        await database("client_schedule")
            .insert({
                id: uuid().toString(),
                status: this.#status,
                created_at: new Date(),
                ...this
            })

    }

    static async deleteFromDB(whereProps: Object) {
        await database("client_schedule")
            .delete()
            .where({
                ...whereProps
            })
    }

    static async getFromDB(whereProps: Object) {
        const client_schedule = await database("client_schedule")
            .select("*")
            .where({
                ...whereProps
            })

        return client_schedule

    }

    async updateInDB(scheduleID: string) {
        await database("clientSchedule")
            .update({
                date: this.date,
                status: this.#status
            })
            .where({
                _salon_id: this._salon_id,
                id: scheduleID
            })
    }

    async validate(): Promise<string> {
        try {
            const today = new Date()
            today.setMinutes(today.getMinutes() + 10)
            const dateSchema = Yup.object().shape({
                date: Yup.date()
                    .min(today, "Data muito proxima! Por favor, insira outra")
                    .required("Data do agendamento obrigatoria")
            })

            await dateSchema.validate({
                ...this
            })

        } catch (error) {
            return error.message
        }
    }
}