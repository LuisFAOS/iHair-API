import azure from "azure-storage"

import {
     v4 as uuid
} from "uuid"

async function uploadImgToAzure(image, containerName) {
     const blobSvc = azure.createBlobService(process.env.AZURE_CONNECTION_STRING)

     let filename = uuid().toString() + '.jpg'

     let matchesBlobImg = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
     let imgType = matchesBlobImg[1]
     let imgBuffer = Buffer.from(matchesBlobImg[2], 'base64')

     await blobSvc.createBlockBlobFromText(containerName, filename, imgBuffer, {
          contentSettings:{contentType:imgType}
     }, (error, result, response) => {
          if (error)
               filename = "default.png"
     })

     const fileUrl = `https://ihairsls.blob.core.windows.net/${containerName}/${filename}`;

     return fileUrl

}

export default uploadImgToAzure