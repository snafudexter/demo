module.exports = {
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    importScripts: (['./worker.js']),
    handleFetch: false
  }