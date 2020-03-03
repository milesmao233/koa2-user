import { Http } from '../utils/http'

export default class UserHttp {
    static async userLogin(data) {
        const res = await Http.request({
            data,
            url: `/user/login`,
            method: 'POST'
        })
        return res
    }

    static async userRegister(data) {
        return await Http.request({
            data,
            url: `/user/register`,
            method: 'POST'
        })
    }

    static async userSetting(data, jwtKey) {
        return await Http.request({
            data,
            url: `/user/changeInfo`,
            method: 'PATCH',
            jwtKey
        })
    }

    // static async getUserInfo(jwtToken) {
    //     return await Http.request({
    //         url: `/user/getUserInfo`,
    //         jwtKey: jwtToken
    //     })
    // }
    static async getUserInfo() {
        return await Http.request({
            url: `/user/getUserInfo`
        })
    }

    static async upload(data, jwt) {
        return await Http.request({
            data,
            url: `/utils/upload`,
            method: 'POST',
            jwtKey: jwt
        })
    }
}
