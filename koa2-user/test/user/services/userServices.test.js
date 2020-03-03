/**
 * @description: user api/login/register test
 * @author Miles
 */

const { getUserInfo } = require('../../../src/services/user')
const { createUser } = require('../../../src/services/user')
// 用户信息
const userName = `u_service_${Date.now()}`
const password = `p_service_${Date.now()}`

const testUser = {
    userName: userName,
    password: password,
    gender: 1
}

// 存储 cookie
let COOKIE = ''


describe('user services', () => {
    it('serivce method createUser', async () => {
        let res
        try {
            res = await createUser(testUser)
        } catch(ex) {
            console.error(ex.message, ex.stack)
        }
        const result = {
            userName: res.userName,
            nickName: res.nickName,
            gender: res.gender
        }
        const expected = {
            userName: testUser.userName,
            nickName: testUser.userName,
            gender: 1,
        }

        expect(result).toEqual(expected)
    })

    it('method getUserInfo', async () => {
        const user = testUser.userName
        let res = await getUserInfo(user)

        const result = {
            userName: res.userName,
            nickName: res.nickName,
            gender: res.gender
        }
        const expected = {
            userName: testUser.userName,
            nickName: testUser.userName,
            gender: '1',
        }

        expect(result).toEqual(expected)
    })
})