import React from 'react'
import User from './containers/User/index'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div>
            <div>
                <p data-test="hello">Hello World</p>
                <User />
            </div>
        </div>
    )
}

export default App
