import React from 'react'
import { shallow } from 'enzyme'
import Login from '../../components/Login'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Login 组件', () => {
    let wrapper, form, userInputElem, passwordInputElem, button
    let fn = jest.fn()
    // let callback = jest.spy()
    beforeAll(() => {
        wrapper = shallow(<Login onLoginChange={fn} />)
        form = findTestWrapper(wrapper, 'form')
        userInputElem = findTestWrapper(wrapper, 'input-username')
        passwordInputElem = findTestWrapper(wrapper, 'input-password')
        button = findTestWrapper(wrapper, 'button')
    })
    it('包含一个表单, 两个 input 框, 一个提交 button', () => {
        expect(form.length).toBe(1)
        expect(userInputElem.length).toBe(1)
        expect(passwordInputElem.length).toBe(1)
        expect(button.length).toBe(1)
    })

    it('点击 button, 如果无内容， 触发提醒 “请输入内容” ', () => {
        wrapper.setState({
            username: '',
            password: ''
        })
        form.simulate('submit', {
            preventDefault: () => {}
        })
        expect(fn).not.toHaveBeenCalled()
    })

    it('点击 button, 如果有内容， 触发 onLoginChange 事件', () => {
        wrapper.setState({
            username: 'miless',
            password: '1234'
        })
        form.simulate('submit', {
            preventDefault: () => {}
        })
        expect(fn).toHaveBeenCalled()
    })
})
