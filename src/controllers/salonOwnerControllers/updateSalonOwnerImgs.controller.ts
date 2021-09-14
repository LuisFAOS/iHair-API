import jwtDecoder from "../../libs/JWT/jwtDecoder"
import deleteImgInAzure from "../../libs/azure/deleteImgInAzure"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure"

import base64ValidationHandler from "../../validations/base64.validation"

import SalonOwner from "../../models/salonOwner.models"


async function updateSalonOwnerImgs(req, res) {
    const {imgInBase64, containerName, imgField} = req.body
    
    const authToken = req.headers['authorization'] || req.headers['token']
    const {
        id: clientID
    } = await jwtDecoder(authToken)
    
    const _db_salon_owner = await SalonOwner.getAllDataFromDB({
        id: clientID
    })

    /* const possibleErrorMessage = await base64ValidationHandler(imgInBase64)
    if (possibleErrorMessage) {
        res.status(400).send(possibleErrorMessage)
        return
    }

    if(!["ownersprofileimgs", "ownerscertificates"].includes(containerName)){
        res.status(400).send("Container inválido!")
        return
    }

    const imgUrl = _db_salon_owner[imgField].replace(`https://ihairsls.blob.core.windows.net/${containerName}/`,"")

    await deleteImgInAzure(containerName, imgUrl)
    const newImgUrl = await uploadImgToAzure(imgInBase64, containerName)
    await SalonOwner.updateInDB({[imgField]: newImgUrl},{id: clientID}) */

    res.status(202).send("Imagem atualizada!")
}


export default updateSalonOwnerImgs