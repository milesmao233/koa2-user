import React, { Component } from 'react'
import './login.css'
import { Form, Button } from 'react-bootstrap'
import UserHttp from '../../../model/user'
import { log } from '../../../utils/util'

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            city: '',
            picture: ''
        }
        this.picInputRef = React.createRef()
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const { nickname, city, picture } = this.state

        this.props.onSettingChange(nickname, city, picture)
    }

    handleNicknameChange = e => {
        this.setState({
            nickname: e.target.value
        })
    }

    handleCityChange = e => {
        this.setState({
            city: e.target.value
        })
    }

    handleFileChange = async e => {
        const jwt = this.props.jwtToken

        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', file)

        const res = await UserHttp.upload(formData, jwt)
        const url = res.data.url

        this.setState({
            picture: url
        })
        this.handleChangePic(url)
    }

    handleChangePic = url => {
        const img = this.picInputRef
        img.current.setAttribute('src', url)
    }

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit} data-test="form">
                <Form.Group controlId="nickname">
                    <Form.Label>昵称</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="请输入昵称"
                        name="nickname"
                        data-test="input-nickname"
                        onChange={this.handleNicknameChange}
                    />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>城市</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="请输入城市"
                        name="city"
                        data-test="input-city"
                        onChange={this.handleCityChange}
                    />
                </Form.Group>

                <Form.Group controlId="picture">
                    <Form.Label>头像</Form.Label>
                    <img
                        ref={this.picInputRef}
                        src=""
                        alt="pic"
                        style={{ width: '100px' }}
                        className="margin-bottom-10"
                        id="img-picture"
                    />
                    <Form.Control
                        type="file"
                        name="picture"
                        data-test="input-picture"
                        onChange={this.handleFileChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" data-test="button">
                    保存
                </Button>
            </Form>
        )
    }
}

export default Setting
