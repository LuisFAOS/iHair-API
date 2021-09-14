import azure from "azure-storage"


async function deleteImgInAzure(containerName, imageUrl) {
    /* const blobSvc = azure.createBlobService(process.env.AZURE_CONNECTION_STRING)

    await blobSvc.deleteBlobIfExists(containerName, imageUrl, (error, result, response) => {
        if (error)
           return "default.png"
    }) */
}

export default deleteImgInAzure