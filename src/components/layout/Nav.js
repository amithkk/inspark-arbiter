import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {firebaseConnect} from 'react-redux-firebase'
import logo from '../../logo.png'


export class Nav extends Component {
    state = {isSignedIn: false}
    handleLogout = e => {
        e.preventDefault()
        this.props.firebase.logout()
    }

    componentDidMount(): void {

        this.props.firebase.auth().onAuthStateChanged((user) => {
            console.log('Auth State Changed')
            if (user) {
                this.setState({
                    isSignedIn: true
                })
            } else {
                this.setState({
                    isSignedIn: false
                })
            }
        })
    }

    render() {

        let links = this.state.isSignedIn ? (<div className="navbar-nav">
                <a className="nav-item nav-link" href="#" onClick={this.handleLogout}>
                    Logout
                </a>
            </div>) :
            null

        console.log(links)
        return (
            <nav className="navbar navbar-dark bg-dark">
                <NavLink to="/" className="navbar-brand" href="#">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                        style={{paddingRight: '5px'}}
                    />
                    Inspark
                </NavLink>
                {links}
            </nav>
        )
    }
}


export default firebaseConnect()(Nav)
