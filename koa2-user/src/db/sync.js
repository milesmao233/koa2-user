/**
 * @description sequelize 同步数据库
 */

const seq = require('./seq')

seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth error')
})

require('./model')

// // 测试连接

// 强制同步
// 删除同名数据表后同步
// 执行同步, force 会重新建表
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})

// // 标准同步
// // 只有当数据库中不存在与模型同名的数据时，才会同步
// seq.sync()
//
// // 动态同步
// // 修改同名数据表结构，以适用模型
// seq.sync({alter: true})

