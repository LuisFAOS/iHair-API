import database from '../libs/knex'

import {v4 as uuid} from 'uuid'

export default class Denunciation {
    reason: string;

    constructor(reason: string) {
        this.reason = reason
    }

    async addToDB() {
        await database('denunciation')
                .insert({
                    id: uuid().toString()
                })
    }
}
