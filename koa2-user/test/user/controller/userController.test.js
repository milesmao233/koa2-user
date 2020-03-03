/**
 * @description: user api/login/register test
 * @author Miles
 */

const { loginUser } = require('../../../src/controller/user')
const { registerUser } = require('../../../src/controller/user')


// 用户信息
const userName = `u_controller_${Date.now()}`
const password = `p_controller_${Date.now()}`

let testUser = {
    userName: userName,
    password: password,
    gender: 1
}

// 存储 cookie
let COOKIE = ''


describe('User 首页注册登录测试', () => {
    // 注册
    describe('user register controller', () => {
        it('method register', async () => {
            const successResult = await registerUser(testUser)
            const resData = successResult.data
            const res = {
                errno: 0,
                data: {
                    userName: resData.userName,
                    nickName: resData.nickName,
                }
            }
            const expected = {
                errno: 0,
                data: {
                    userName: testUser.userName,
                    nickName: testUser.userName,
                }
            }
            expect(res).toEqual(expected)
        })

        it('method register 相同的用户名', async () => {
            const wrongResult = await registerUser(testUser)
            const errno = wrongResult.errno
            const expected = 10001
            expect(errno).toBe(expected)
        })
    })



    // 登录
    describe('user login controller', () => {
        it('method login', async () => {
            const successResult = await loginUser(testUser)
            const resErrno = successResult.errno
            const expected = 0
            expect(resErrno).toEqual(expected)
        })
    })
})