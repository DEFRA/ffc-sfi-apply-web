const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('./config').storageConfig
let blobServiceClient
let containersInitialised

if (config.useConnectionStr) {
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
} else {
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const parcelStandardContainer = blobServiceClient.getContainerClient(config.parcelStandardContainer)

const initialiseContainers = async () => {
  await parcelStandardContainer.createIfNotExists()
  containersInitialised = true
}

const getBlob = async (container, filename) => {
  containersInitialised ?? await initialiseContainers()
  return container.getBlockBlobClient(filename)
}

const downloadParcelStandardFile = async (filename) => {
  const blob = await getBlob(parcelStandardContainer, filename)
  const downloaded = await blob.downloadToBuffer()
  return downloaded.toString()
}

module.exports = {
  downloadParcelStandardFile,
  blobServiceClient
}
