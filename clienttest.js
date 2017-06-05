'use strict'

let Client = require('./')['Client']
let clientInstance = new Client('127.0.0.1', '6969')
clientInstance.registerClient()

