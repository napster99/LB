'use strict'

/*
 * 工具类
 */

let os = require('os')
let _ = require('lodash')
let ps = require('current-processes')

module.exports = {

    now() {
        return +new Date()
    },

    //获取性能最优的服务器
    getBestUnit(obj) {
        let arr = _.sortBy(obj, 'mem').reverse()
        for (let i = 0; i < arr.length; i++) {
            let cpu = arr[i]['cpu']
            if (cpu < 80) {
                return arr[i]
            }
        }
    },

    //获取性能最差的服务器
    getLowerestUnit(obj) {
        let arr = _.sortBy(obj, 'mem')
        for (let i = 0; i < arr.length; i++) {
            let cpu = arr[i]['cpu']
            if (cpu > 80) {
                return arr[i]
            }
        }
        return arr && arr[0]
    },

    //获取CPU 使用率  5秒采样一次
    getCpuUseage() {
        return new Promise((resolve, reject) => {
            let count = 1,
                cpus = 0,
                total_cpus = 0,
                o = setInterval(() => {
                    ps.get((err, processes) => {
                        let sorted = _.sortBy(processes, 'cpu')
                        let top5 = sorted.reverse().splice(0, 5)
                        for (let i = 0; i < top5.length; i++) {
                            cpus += top5[i]['cpu']
                        }
                        total_cpus += cpus
                        if (count === 5) {
                            clearInterval(o)
                                // console.log('平均', 'cpus', total_cpus, total_cpus / count, 'count', count)
                            resolve(total_cpus / count)
                        }
                        count++
                    });
                }, 1000)
        })
    },

    //获取内存 使用率
    getMemUseage() {
        return os.freemem()
    }

}
