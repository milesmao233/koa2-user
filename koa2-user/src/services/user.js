/**
 * @description Service user
 * @author Miles
 */

const { User } = require('../db/model')

const createUser = async ({ userName, password, gender = 3, nickName }) => {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })

    return result.dataValues
}

const getUserInfo = async (userName, password) => {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    const result = await User.findOne({
        attributes: ['id', 'userName', 'gender', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) {
        return result
    }

    return result.dataValues
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改的行数
}

module.exports = {
    createUser,
    updateUser,
    getUserInfo
}
