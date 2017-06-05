'use strict'

let Server = require('./')['Server']
let serverInstance = new Server()
serverInstance.startServer()

setTimeout(() => {
  console.log('开始获得最优服务器')
  serverInstance.getBestUnit()
}, 20000)
