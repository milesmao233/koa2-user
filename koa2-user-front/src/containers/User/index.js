import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Setting from './components/Setting'
import UserHttp from '../../model/user'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: null,
            jwtToken: null
        }
    }

    componentDidMount = async () => {
        try {
            const res = await UserHttp.getUserInfo()
            const userName = res.data.userName
            const jwtToken = res.data.jwt

            this.setState({
                userName,
                jwtToken
            })
        } catch (ex) {
            console.log('ex2', ex)
        }
    }

    loginUser = async (user, password) => {
        const loginRes = await UserHttp.userLogin({
            userName: user,
            password
        })
        const errno = loginRes.errno
        const jwt = loginRes.data

        let result
        if (errno === 0) {
            const infoRes = await UserHttp.getUserInfo(jwt)
            const userName = infoRes.data.userName
            this.setState({
                userName,
                jwtToken: jwt
            })
            result = '登录成功'
        } else {
            result = '登录失败'
        }
        console.log('result', result)
        return result
    }

    registerUser = async (username, password, gender) => {
        const registerRes = await UserHttp.userRegister({
            userName: username,
            password,
            gender
        })
        const errno = registerRes.errno
        let result
        if (errno === 0) {
            const userInfo = registerRes.data
            result = userInfo
        } else {
            const message = registerRes.message
            result = message
        }

        console.log('result', result)
        return result
    }

    settingUser = async (nickname, city, picture) => {
        const jwt = this.state.jwtToken
        const settingRes = await UserHttp.userSetting(
            {
                nickname,
                city,
                picture
            },
            jwt
        )
        const errno = settingRes.errno

        let result
        if (errno === 0) {
            const userInfo = settingRes.data
            result = userInfo
        } else {
            const message = settingRes.message
            result = message
        }

        console.log('result', result)
        return result
    }

    render() {
        const { userName } = this.state
        return (
            <Router>
                <p>{userName ? `User ${userName}` : 'User 请登录'}</p>
                <ul>
                    <li>
                        <Link to="/user/login" data-test="link">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/logout" data-test="link">
                            Logout
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/register" data-test="link">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/setting" data-test="link">
                            Setting
                        </Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/user/login">
                        <Login onLoginChange={this.loginUser} />
                    </Route>
                    <Route path="/user/logout">
                        <Logout />
                    </Route>
                    <Route path="/user/register">
                        <Register onRegisterChange={this.registerUser} />
                    </Route>
                    <Route path="/user/setting">
                        <Setting
                            onSettingChange={this.settingUser}
                            jwtToken={this.state.jwtToken}
                        />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default User
