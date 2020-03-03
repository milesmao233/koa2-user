/**
 * @description: user api/login/register test
 * @author Miles
 */


const server = require('../../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

let registerTestUser = {
    userName: userName,
    password: password,
    gender: 1
}

const registerTestUserUnCorrect = {
    userName: 2,
    password: 2,
    gender: 2,
}

let loginTestUserCorrect = {
    userName: userName,
    password: password,
}

const loginTestUserUnCorrect = {
    userName: userName,
    password: password + '1',
}

// 存储 auth, cookie
let auth = ''
let cookie = ''

describe('User 首页注册登录测试', () => {
    // 注册
    describe('user register routes', () =>  {
        it('注册一个用户，应该成功', async () => {
            const res = await server.post('/api/user/register').send(registerTestUser)
            expect(res.body.errno).toBe(0)
        })

        it('注册一个用户，用户名已经存在的话，失败', async () => {
            const res = await server.post('/api/user/register').send(registerTestUser)
            expect(res.body.errno).not.toBe(0)
        })

        it('注册一个用户，格式错误，失败', async () => {
            const res = await server.post('/api/user/register').send(registerTestUserUnCorrect)
            expect(res.body.errno).not.toBe(0)
        })
    })

    // 登录
    describe('user login routes', () => {
        it('登录用户，正确密码，应该成功', async () => {
            const res = await server.post('/api/user/login').send(loginTestUserCorrect)
            auth = `Bearer ${res.body.data}`
            cookie = `access_token=${res.body.data}`
            expect(res.body.errno).toBe(0)
        })

        it('登录用户，密码错误，应该失败', async () => {
            const res = await server.post('/api/user/login').send(loginTestUserUnCorrect)
            expect(res.body.errno).not.toBe(0)
        })
    })

    // 用户查询
    describe('userInfo 查询', () => {
        it('登录用户, 成功查询 userInfo', async () => {
            const res = await server.get('/api/user/getUserInfo').set('cookie', cookie)
            expect(res.body.errno).toBe(0)
        })

        it('登录用户，密码错误，应该失败', async () => {
            const res = await server.post('/api/user/login').send(loginTestUserUnCorrect)
            expect(res.body.errno).not.toBe(0)
        })
    })

    // 退出
    describe('user logout routes', () => {
        it('登出成功', async () => {
            const res = await server.get('/api/user/logout')
                .set('Authorization', auth)
                .set('cookie', cookie)
                .send(loginTestUserCorrect)
            expect(res.body.errno).toBe(0)
        })
    })
})