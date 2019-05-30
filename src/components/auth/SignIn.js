import React, {Component} from 'react'
import './SignIn.css'
import {firebaseConnect} from 'react-redux-firebase'

export class SignIn extends Component {
    state = {
        email: '',
        password: '',
        hasFailed: false,
        isLoading: false
    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState({isLoading: true})
        this.props.firebase.login({
            email: this.state.email.trim() + '@inspark-ise.fb',
            password: this.state.password
        }).then(success => {
            console.log('Successfully Authed')
            this.props.history.push('/')
            this.setState({hasFailed: false, isLoading: false})
        }, fail => {
            console.log('Failed To Auth: ', fail)
            this.setState({hasFailed: true, isLoading: false})
        })
    }

    render() {
        let message = ''
        let loader = ''
        if (this.state.hasFailed) {
            message = <div className="alert alert-danger" role="alert">
                Login Failed
            </div>
        }

        if (this.state.isLoading) {
            loader = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="false"></span>
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Judge Sign In</h5>
                                    <form className="form-signin" onSubmit={this.handleSubmit}>
                                        {message}
                                        <div className="form-label-group">
                                            <input
                                                type="text"
                                                id="email"
                                                className="form-control"
                                                placeholder="User ID"
                                                required
                                                autoFocus
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="email">User ID</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>

                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"
                                        >
                                            {loader}
                                            Sign in
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default firebaseConnect()(SignIn)
