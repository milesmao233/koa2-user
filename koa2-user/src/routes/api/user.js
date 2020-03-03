const { loginCheck } = require('../../middlewares/loginChecks')
const { userValidate } = require('../../validator/user')
const { generatorValidator } = require('../../../middlewares/validator')
const {
    registerUser,
    loginUser,
    logoutUser,
    getInfoUser,
    changeInfo
} = require('../../controller/user')
const router = require('koa-router')()

router.prefix('/api/user')

router.post(
    '/register',
    generatorValidator(userValidate),
    async (ctx, next) => {
        const { userName, password, gender } = ctx.request.body
        ctx.body = await registerUser({ userName, password, gender })
    }
)

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    const loginRes = await loginUser({ userName, password })
    ctx.body = loginRes
    if (loginRes.errno === 0) {
        const jwt = loginRes.data
        ctx.cookies.set('access_token', jwt, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        })
    }
})

router.get('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logoutUser(ctx)
})

router.get('/getUserInfo', loginCheck, async (ctx, next) => {
    const userInfo = ctx.state.userInfo
    const jwt = ctx.state.jwt
    ctx.body = await getInfoUser(userInfo, jwt)
})

// 修改个人信息
router.patch(
    '/changeInfo',
    loginCheck,
    generatorValidator(userValidate),
    async (ctx, next) => {
        console.log('ctx.request.body', ctx.request.body)
        const nickName = ctx.request.body.nickname
        const { city, picture } = ctx.request.body
        ctx.body = await changeInfo(ctx, { nickName, city, picture })
    }
)

module.exports = router
