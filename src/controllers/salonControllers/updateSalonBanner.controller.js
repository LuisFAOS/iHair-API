import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"
import deleteImgInAzure from "../../libs/azure/deleteImgInAzure.js"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure.js"

import base64ValidationHandler from "../../validations/base64.validation.js"

import {getSalonFromDB} from "../../models/salon.models.js"
import {updateSalonInDB} from "../../models/salon.models.js"


async function updateSalonBanner(req, res){
    const {imgInBase64} = req.body

    const authToken = req.headers['authorization'] || req.headers['token']
    const {
        client
    } = await jwtDecoder(authToken)
    
    let {id, bannerImgUrl} = await getSalonFromDB({
        salonOwnerID: client.id
    })

    const possibleErrorMessage = await base64ValidationHandler(imgInBase64)
    if (possibleErrorMessage) {
        res.status(400).send(possibleErrorMessage)
        return
    }
    
    bannerImgUrl = bannerImgUrl.replace("https://ihairsls.blob.core.windows.net/salonsbanners/","")
    await deleteImgInAzure("salonsbanners", bannerImgUrl)
    const newBannerImgUrl = await uploadImgToAzure(imgInBase64, "salonsbanners")
    await updateSalonInDB({bannerImgUrl: newBannerImgUrl},{id})

    res.status(202).send("Banner atualizado com sucesso!!")
}


export default updateSalonBanner