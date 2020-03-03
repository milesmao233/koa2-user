/**
 * @description: user validator test
 * @author Miles
*/

const { userValidate } = require('../../src/validator/user')
// 用户信息
const userName = `u_validator_${Date.now()}`
const password = `p_validator_${Date.now()}`

let testUser = {
    userName: userName,
    password: password,
    gender: 1
}

let testUserWrong = {
    userName: 1,
    password: 1,
    gender: 1
}

describe('User 注册验证', () => {
    // 验证
    it('method userValidate correct', () => {
        const res = userValidate(testUser)
        expect(res).toBeUndefined()
    })

    it('method userValidate wrong', () => {
        const res = userValidate(testUserWrong)
        console.log('res', res)
        expect(res).toBeTruthy()
    })
})