import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            gender: null
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

    handleGenderChange = event => {
        this.setState({
            gender: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        const user = this.state.username
        const password = this.state.password
        const gender = this.state.gender
        if (!user || !password || !gender) {
            console.log('请输入用户名、密码、性别')
            return
        }
        this.props.onRegisterChange(user, password)
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
                        onChange={this.handleUsernameChange}
                        data-test="input-username"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.handlePasswordChange}
                        data-test="input-password"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Gender"
                        name="gender"
                        onChange={this.handleGenderChange}
                        data-test="input-gender"
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

export default Register
