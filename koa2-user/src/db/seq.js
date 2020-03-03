/**
 * @description sequelize 实例
 * @author Miles
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

if (isTest) {
    // test 时不 log sql
    conf.logging = () => {}
}

if (isProd) {
    // 线上环境
    conf.pool = {
        max: 5, // 连接池中最大的连接数量,
        min: 0,
        idle: 10000, // 如果一个连接池 10s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq

// // 测试连接
/*
seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('error')
})
*/


