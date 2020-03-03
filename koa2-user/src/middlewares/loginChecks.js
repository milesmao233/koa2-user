/**
 * @description: loginChecks.js
 * @author Miles
 */

const jwt = require('jsonwebtoken')
const util = require('util')
const { JWT_SECRET_KEY } = require('../config/secretKey')
const verify = util.promisify(jwt.verify)
const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * Api 登录验证
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function loginCheck(ctx, next) {
    // const token = ctx.header.authorization
    const cookie = ctx.cookies.get('access_token')
    try {
        const payload = await verify(cookie, JWT_SECRET_KEY)
        ctx.state.userInfo = payload
        ctx.state.jwt = cookie
        await next()
    } catch (ex) {
        console.log('ex', ex)
        ctx.body = new ErrorModel(loginCheckFailInfo)
    }
}

module.exports = {
    loginCheck
}
