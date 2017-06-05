'use strict'

/*
 * 客户端
 */

let co = require('co');
let net = require('net');
let util = require('./Util');

let HOST = '127.0.0.1';
let PORT = 6969;

function Client() {
    this.client = new net.Socket()
    this.status = 0
}

//向主服务注册客户端
Client.prototype.registerClient = function() {
    let self = this

    this.client.connect(PORT, HOST, function() {
        self.status = 1
        co(function*() {
            console.log('CONNECTED TO: ' + HOST + ':' + PORT)
                // 建立连接后立即向服务器发送数据，服务器将收到这些数据 
                // 连接成功，初始化采集数据
            self.initInfo()
        })()
    });

    this.client.on('data', function(data) {
        console.log('DATA: ' + data)
    });

    // 为客户端添加“close”事件处理函数
    this.client.on('close', function() {
        console.log('Connection closed')
        self.status = 0
        if (self.o) {
            clearInterval(self.o)
        }
    });
}

//收集机器状况
Client.prototype.getInfo = function() {
    return co(function*() {
        let cpu = yield util.getCpuUseage()
        let mem = util.getMemUseage()
        console.log('cup 使用率>>>', cpu)
        return {
            cpu: cpu,
            mem: mem
        }
    })
}

//5s收集一次
Client.prototype.initInfo = function() {
    let self = this
    this.o = setInterval(() => {
        co(function*() {
            let info = yield self.getInfo()
            console.log('info', info)
            self.sendData(info)
        })()
    }, 5000)
}

//发送数据
Client.prototype.sendData = function(data) {
    if (this.status) {
        this.client.write(JSON.stringify(data));
    }
}

//接受数据
Client.prototype.getData = function(data) {

}

module.exports = Client
