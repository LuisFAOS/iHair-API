import jwtDecoder from "../../libs/JWT/jwtDecoder"
import deleteImgInAzure from "../../libs/azure/deleteImgInAzure"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure"

import base64ValidationHandler from "../../validations/base64.validation"

import Salon from "../../models/salon.models"

async function updateSalonBanner(req, res){
    /* const {imgInBase64} = req.body

    const authToken = req.headers['authorization'] || req.headers['token']
    const {
        id: clientID
    } = await jwtDecoder(authToken)
    
    let {id, bannerImgUrl} = await Salon.getFromDB({
        salonOwnerID: clientID
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

    res.status(202).send("Banner atualizado com sucesso!!") */
}


export default updateSalonBanner