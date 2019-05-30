import React, {Component} from 'react'
import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Nav from './components/layout/Nav'
import TeamPicker from './components/dash/TeamPicker'
import MarkingList from './components/marking/MarkingList'
import SignIn from './components/auth/SignIn'
import {UserIsAuthenticated, UserIsNotAuthenticated} from './hoc/authHoc'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={UserIsAuthenticated(TeamPicker)}/>
                        <Route path='/judge/:id' component={UserIsAuthenticated(MarkingList)}/>
                        <Route path='/signin' component={UserIsNotAuthenticated(SignIn)}/>
                        <Redirect to="/"/>

                    </Switch>
                </div>
            </BrowserRouter>


        )
    }
}

export default App
