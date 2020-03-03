const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwtKoa = require('koa-jwt')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./config/db')
const index = require('./routes/index')
const users = require('./routes/users')
const userApis = require('./routes/api/user')
const utilsApis = require('./routes/api/utils')
const { JWT_SECRET_KEY } = require('./config/secretKey')

// error handler
onerror(app)

// jwt middlewares
app.use(
    jwtKoa({
        secret: JWT_SECRET_KEY
    }).unless({
        path: [
            /^\/api\/user\/login/,
            /^\/api\/user\/register/,
            /^\/api\/user\/getUserInfo/,
            /.png$/,
            /.jpeg$/
        ]
    })
)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(
    views(__dirname + '/views', {
        extension: 'ejs'
    })
)

// app.keys = ['ABcd_7788']
// app.use(session({
//     key: 'weibo.sid', // cookie name 默认是 'koa.sid'
//     prefix: 'weibo:sess:', // redis key 的前缀, 默认是 'koa:sess:'
//     cookie: {
//         path: '/',
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000, // 24小时
//     },
//     // ttl: 24 * 60 * 60 * 1000,  // redis 过期时间
//     store: redisStore({
//         all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
//     })
// }))
// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userApis.routes(), userApis.allowedMethods())
app.use(utilsApis.routes(), utilsApis.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
