'use strict'

/*
 * 服务器端
 */

let net = require('net')
let util = require('./Util')

function Server(ops = {}) {

    this.host = ops.host || '127.0.0.1'
    this.port = ops.port || 6969

    this.clientsObj = {}
}

//启动服务
Server.prototype.startServer = function() {
    let self = this

    net.createServer(function(sock) {
        let serverid = sock.remoteAddress + ':' + sock.remotePort

        console.log('客户端连接成功: ' + serverid)
        if (!self.clientsObj[serverid]) {
            self.clientsObj[serverid] = {}
        }

        sock.on('data', function(data) {
            console.log('服务端接收数据：' + sock.remoteAddress + ': ' + data);
            self.getData(serverid, data);
            // sock.write('You said "' + data + '"');
        });

        sock.on('close', function(data) {
            console.log('关闭连接 close', data) //false
            sock.write('服务器关闭通知');
            self.destory(serverid)
        });

        sock.on('error', function(err) {
            console.log('关闭连接 error', err) //false
            self.destory(serverid)
        });

    }).listen(this.port, this.host);

    console.log('Server listening on ' + this.host + ':' + this.port);

}

//发送数据
Server.prototype.sendData = function(data) {

}

//接受数据
Server.prototype.getData = function(serverid, data) {
    if (this.clientsObj[serverid]) {
        this.clientsObj[serverid] = JSON.parse(data.toString('utf-8'))
    }
    console.log('getData>>', serverid, data.toString(), util.now())
}

//关闭服务
Server.prototype.destory = function(serverid) {
    if (this.clientsObj[serverid]) {
        delete this.clientsObj[serverid]
    }
}

//获取性能最优的服务器
Server.prototype.getBestUnit = function() {
    let unit = util.getBestUnit(this.clientsObj)
    console.log('Best unit', unit)
}

//获取性能最差的服务器
Server.prototype.getLowerestUnit = function() {
    let unit = util.getLowerestUnit(this.clientsObj)
    console.log('Lowerest unit', unit)
}


module.exports = Server
