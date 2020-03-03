import { config } from '../config/config'
// import { promisic } from './util'
import axios from 'axios'

export class Http {
    static async request({ url, data, method = 'GET', jwtKey }) {
        let requestConfig = {
            url: `${config.apiBaseUrl}${url}`,
            method
        }
        if (data) {
            Object.assign(requestConfig, {
                data
            })
        }
        if (jwtKey) {
            Object.assign(requestConfig, {
                headers: {
                    Authorization: `Bearer ${jwtKey}`
                }
            })
        }
        console.log('requestConfig', requestConfig)
        const res = await axios.request(requestConfig)
        return res.data
    }
}
