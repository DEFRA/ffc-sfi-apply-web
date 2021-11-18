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
const parcelSpatialContainer = blobServiceClient.getContainerClient(config.parcelSpatialContainer)

async function initialiseContainers () {
  await parcelStandardContainer.createIfNotExists()
  containersInitialised = true
}

async function getBlockBlobClient (container, filename) {
  containersInitialised ?? await initialiseContainers()
  return container.getBlockBlobClient(filename)
}

async function downloadFile (container, filename) {
  const blockBlobClient = await getBlockBlobClient(container, filename)
  let downloadBuffer
  try {
    downloadBuffer = await blockBlobClient.downloadToBuffer()
  } catch (e) {
    console.error(e)
  }
  return JSON.parse(downloadBuffer.toString())
}

async function downloadParcelStandardFile (filename) {
  return downloadFile(parcelStandardContainer, filename)
}

async function downloadParcelSpatialFile (filename) {
  return downloadFile(parcelSpatialContainer, filename)
}

module.exports = {
  downloadParcelStandardFile,
  downloadParcelSpatialFile,
  blobServiceClient
}
