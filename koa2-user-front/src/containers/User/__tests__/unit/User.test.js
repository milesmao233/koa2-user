import React from 'react'
import { shallow } from 'enzyme'
import User from '../../index'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('User 组件', () => {
    let wrapper, links
    let fn = jest.fn()
    // let callback = jest.spy()
    beforeAll(() => {
        wrapper = shallow(<User />)
        links = findTestWrapper(wrapper, 'link')
    })
    it('包含3个连接, login logout register', () => {
        expect(links.length).toBe(3)
    })

    it('应该给 login 组件传递一个 onLoginChange 方法', () => {
        const wrapper = shallow(<User />)
        const Login = wrapper.find('Login')
        expect(Login.prop('onLoginChange')).toBeTruthy()
    })

    it('应该给 register 组件传递一个 onRegisterChange 方法', () => {
        const wrapper = shallow(<User />)
        const Register = wrapper.find('Register')
        expect(Register.prop('onRegisterChange')).toBeTruthy()
    })

    it('调用 onLoginChange 方法时，注册用户, 如果用户名密码正确返回登录成功', async () => {
        const wrapper = shallow(<User />)
        const username = 'miless'
        const password = '1234'
        const result = await wrapper.instance().loginUser(username, password)
        expect(result).toBe('登录成功')
    })

    it('调用 onLoginChange 方法时，注册用户, 如果用户名密码不正确返回登录失败', async () => {
        const wrapper = shallow(<User />)
        const username = 'mi'
        const password = '1234'
        const result = await wrapper.instance().loginUser(username, password)
        expect(result).toBe('登录失败')
    })
})
