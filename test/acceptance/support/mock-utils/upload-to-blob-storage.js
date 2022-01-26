const { BlobServiceClient } = require('@azure/storage-blob')

async function uploadParcelSpatialFile (fileName, fileObject) {
  const blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
  const parcelContainer = await getContainerClient(blobServiceClient, 'parcels')
  const parcelStandardContainer = await getContainerClient(blobServiceClient, 'parcels-standard')
  const parcelSpatialContainer =  await getContainerClient(blobServiceClient, 'parcels-spatial')

  const blobClient = parcelSpatialContainer.getBlockBlobClient(fileName)
  const parcelString = JSON.stringify(fileObject)
  await blobClient.upload(parcelString, parcelString.length)
}

async function getContainerClient (client, containerName) {
  const newClient = await client.getContainerClient(containerName)
  newClient.createIfNotExists()
  return newClient
}

export { uploadParcelSpatialFile }