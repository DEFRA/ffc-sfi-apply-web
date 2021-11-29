const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const wreck = require('@hapi/wreck')
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

async function downloadFileFromUrl (storageUrl) {
  return wreck.get(storageUrl, { json: true })
}

async function downloadParcelStandardFile (request) {
  if (config.useBlobUrls) {
    return downloadFileFromUrl(request.storageUrl)
  }
  return downloadFile(parcelStandardContainer, request.filename)
}

async function downloadParcelSpatialFile (request) {
  if (config.useBlobUrls) {
    return downloadFileFromUrl(request.storageUrl)
  }
  return downloadFile(parcelSpatialContainer, request.filename)
}

module.exports = {
  downloadParcelStandardFile,
  downloadParcelSpatialFile,
  blobServiceClient
}
