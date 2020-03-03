import React, { Component } from 'react'
import './login.css'
import { Form, Button } from 'react-bootstrap'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        const user = this.state.username
        const password = this.state.password
        if (!user || !password) {
            console.log('请输入用户名或密码')
            return
        }
        this.props.onLoginChange(user, password)
    }

    render() {
        return (
            <Form onSubmit={this.handleFormSubmit} data-test="form">
                <Form.Group controlId="username">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        data-test="input-username"
                        onChange={this.handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        data-test="input-password"
                        onChange={this.handlePasswordChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" data-test="button">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default Login
