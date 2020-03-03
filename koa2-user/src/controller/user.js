/**
 * @description Controller user
 * @author Miles
 */

const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/secretKey')
const {
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    changeInfoFailInfo
} = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')
const { SuccessModel } = require('../model/ResModel')
const { createUser, getUserInfo, updateUser } = require('../services/user')

/**
 *
 * @param userName
 * @param password
 * @param gender
 * @returns {Promise<SuccessModel>}
 */
const registerUser = async ({ userName, password, gender }) => {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    } else {
        try {
            const userInfo = await createUser({ userName, password, gender })
            return new SuccessModel(userInfo)
        } catch (ex) {
            console.error(ex.message, ex.stack)
            return new ErrorModel(registerFailInfo)
        }
    }
}

const loginUser = async ({ userName, password }) => {
    let userInfo = await getUserInfo(userName, password)
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }

    userInfo = jwt.sign(userInfo, JWT_SECRET_KEY, { expiresIn: '1h' })
    return new SuccessModel(userInfo)
}

const getInfoUser = async (userInfo, jwt) => {
    const infoAndJWT = Object.assign(userInfo, { jwt })
    return new SuccessModel(infoAndJWT)
}

const logoutUser = async ctx => {
    delete ctx.state.userInfo
    return new SuccessModel()
}

const changeInfo = async (ctx, { nickName, city, picture }) => {
    const { userName } = ctx.state.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    if (result) {
        // 执行成功
        Object.assign(ctx.state.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getInfoUser,
    changeInfo
}
