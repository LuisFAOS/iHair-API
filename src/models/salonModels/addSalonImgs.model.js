import dbHandler from "../../config/knex.js"


async function addSalonImgsInDB(salonImgsUrl, salonID) {
     salonImgsUrl.forEach(async url => {
          await dbHandler("salonImgs").insert({
               url,
               salonID
          })
     })
}

export default addSalonImgsInDB