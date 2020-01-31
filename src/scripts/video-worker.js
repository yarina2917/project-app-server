const { workerData, parentPort } = require('worker_threads')
const path = require('path')
const uuid = require('uuid')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const Ffmpeg = require('fluent-ffmpeg')
Ffmpeg.setFfmpegPath(ffmpegPath)

const filePath = path.join(__dirname, '../files/')
const newPath = `${uuid.v4()}.mp4`

new Ffmpeg({ source: filePath + workerData })
  .toFormat('mp4')
  .saveToFile(filePath + newPath, (retcode, err) => {
    if (err) {
      console.error('file save error', err)
      parentPort.postMessage({ message: err.msg, status: 'Error' })
    }
  })
  .on('error', (err) => {
    console.error('file convert error', err)
    parentPort.postMessage({ message: err.msg, status: 'Error' })
  })
  .on('end', () => {
    console.log('file has been converted successfully')
    parentPort.postMessage({ fileName: newPath, status: 'Done' })
  })
