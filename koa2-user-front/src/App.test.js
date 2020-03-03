import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { findTestWrapper } from './utils/testUtils'

let wrapper
describe('App 组件', () => {
    beforeEach(() => {
        wrapper = shallow(<App />)
    })
    it('render Hello World', () => {
        const elem = findTestWrapper(wrapper, 'hello')
        expect(elem.text()).toEqual('Hello World')
    })
})
