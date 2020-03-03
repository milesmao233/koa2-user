/**
 * @description: json schema 验证中间件
 * @author Miles
*/

const { jsonSchemaFileInfo } = require('../src/model/ErrorInfo')
const { ErrorModel } = require('../src/model/ResModel')

const generatorValidator = (validateFn) => {
    const validator = async (ctx, next) => {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }

        // 验证成功，继续
        await next()
    }

    return validator
}

module.exports = {
    generatorValidator
}