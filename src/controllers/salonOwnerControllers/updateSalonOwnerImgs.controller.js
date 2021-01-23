import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"
import deleteImgInAzure from "../../libs/azure/deleteImgInAzure.js"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure.js"

import base64ValidationHandler from "../../validations/base64.validation.js"

import {getSalonOwnerFromDB} from "../../models/salonOwner.models.js"
import {updateSalonOwnerInDB} from "../../models/salonOwner.models.js"


async function updateSalonOwnerImgs(req, res) {
    const {imgInBase64, containerName, imgField} = req.body
    
    const authToken = req.headers['authorization'] || req.headers['token']
    const {
        client
    } = await jwtDecoder(authToken)
    
    const dbResultOwnerDatas = await getSalonOwnerFromDB({
        id: client.id
    })

    const possibleErrorMessage = await base64ValidationHandler(imgInBase64)
    if (possibleErrorMessage) {
        res.status(400).send(possibleErrorMessage)
        return
    }

    if(!["ownersprofileimgs", "ownerscertificates"].includes(containerName)){
        res.status(400).send("Container inválido!")
        return
    }

    const imgUrl = dbResultOwnerDatas[imgField].replace(`https://ihairsls.blob.core.windows.net/${containerName}/`,"")

    await deleteImgInAzure(containerName, imgUrl)
    const newImgUrl = await uploadImgToAzure(imgInBase64, containerName)
    await updateSalonOwnerInDB({[imgField]: newImgUrl},{id: client.id})

    res.status(202).send("Imagem atualizada!")
}


export default updateSalonOwnerImgs