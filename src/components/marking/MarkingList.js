import React, {Component} from 'react'
import './MarkingList.css'
import MarkingComponent from './MarkingComponent'
import {connect} from 'react-redux'
import {compose} from 'redux'
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect'
import {isEmpty, isLoaded} from 'react-redux-firebase/lib/helpers'
import LoadingScreen from 'react-loading-screen'
import logo from '../../logo.png'

class MarkingList extends Component {
    state = {
        rubricState: {
            ident: 0,
            survey: 0,
            design: 0,
            work_done: 0,
            results: 0,
            demo: 0,
            documentation: 0,
            suggestions: ''
        },
        hasZeroes: false,
        isLoading: false,
        markingDone: false
    }

    rubrics = [
        {name: 'Identification of  Problem Domain and Motivation', fb: 'ident'},
        {name: 'Literature Survey', fb: 'survey'},
        {name: 'Design Methodology', fb: 'design'},
        {name: 'Work Done', fb: 'work_done'},
        {name: 'Results', fb: 'results'},
        {name: 'Demonstration and Presentation', fb: 'demo'},
        {name: 'Documentation', fb: 'documentation'}
    ]

    handleAddRubic = (name, val) => {
        if (name === 'design' || name === 'work_done' || name === 'results') {
            val = val * 2
        }
        let sum = 0
        sum = 0
        Object.keys(this.state.rubricState).forEach(item => {
            if (name === 'suggestions' || item === 'suggestions') {
                console.log('Is Suggestions')
            } else if (item === name) {
                sum += val
            } else if (item === 'total') {
                //do nothing
            } else {
                sum += this.state.rubricState[item]
                console.log(this.state.rubricState[item])
            }
        })
        console.log('Sum:' + sum)
        this.setState({
            rubricState: {...this.state.rubricState, [name]: val, total: sum}
        })
    }
    handleSubmit = e => {
        console.log(this.state)
        let foundZeroes = Object.keys(this.state.rubricState).some(k => {
            return this.state.rubricState[k] === 0
        })
        this.setState({hasZeroes: foundZeroes})
        let uid = this.props.firebase.auth().currentUser.uid
        if (!foundZeroes) {
            this.setState({isLoading: true})
            console.log('State: ' + this.state.rubricState)
            this.props.firebase.set(
                'teams/' + this.props.match.params.id + '/judgement/' + uid,
                this.state.rubricState,
                () => {
                    console.log('Done Set!')
                    this.setState({isLoading: false, markingDone: true})
                }
            )

            console.log('Tes:', this.props.team[this.props.match.params.id])

            let sum = 0, count = 0
            if (this.props.team[this.props.match.params.id]['judgement'] != null) {
                let judgements = this.props.team[this.props.match.params.id]['judgement']
                sum = 0
                count = 0
                Object.keys(judgements).forEach(item => {
                    count++
                    if (item === this.props.firebase.auth().currentUser.uid) {
                        sum += this.state.rubricState.total
                    } else {
                        sum += judgements[item].total
                    }
                })
            }
            let avg = 0
            if (count === 0) {
                avg = this.state.rubricState.total
            } else {
                avg = sum / count
            }

            this.props.firebase.set(
                'teams/' + this.props.match.params.id + '/avg',
                avg,
                () => {
                    console.log('Done SetAvg!')
                }
            )
        }
    }

    render() {
        console.log(this.props)
        let table = ''
        let message = ''
        let innerCard = ''
        let loader = ''
        if (this.state.isLoading) {
            loader = (
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="false"
                />
            )
        }
        const id = this.props.match.params.id
        const imgUri =
            'https://ui-avatars.com/api/?rounded=true&name=' +
            id +
            '&size=128&background=0D8ABC&color=fff'

        if (this.state.hasZeroes) {
            message = (
                <div className="alert alert-danger" role="alert">
                    Please rate all the components!
                </div>
            )
        }

        if (
            !this.state.markingDone &&
            !isEmpty(this.props.team) &&
            this.props.team[id] != null
        ) {
            if (isLoaded(this.props.team) && !isEmpty(this.props.team[id])) {
                console.log('It\'s Loaded!')
                let members = this.props.team[id].members
                if (members != null) {
                    table = Object.keys(members).map(function (key) {
                        return (
                            <tr>
                                <td>{members[key]}</td>
                                <td>{key}</td>
                            </tr>
                        )
                    })
                }
            }
            innerCard = (
                <div className="card-body">
                    <h5 className="card-title text-center">Team {id}</h5>

                    <div className="row">
                        <div className="col-sm-4 text-avatar">
                            <img className="mx-auto" src={imgUri}/>
                        </div>
                        <div className="col-sm-8 text-center">
                            <div className="table-card">
                                <table className="table table-striped table-bordered">
                                    <tbody>{table} </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12">
                                <div class="shadow-sm p-3 mb-3 bg-light rounded">
                                    <div className="font-weight-bold bcol col-sm-12 p-2 p-b-3 text-center">
                                        Problem Statement
                                    </div>
                                    <div className="col col-sm-12 text-center">
                                        {this.props.team[id].ptitle}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.rubrics.map((object, i) => (
                            <MarkingComponent
                                name={object.name}
                                key={i}
                                ident={object.fb}
                                changeHandler={this.handleAddRubic}
                            />
                        ))}
                    </div>
                    {message}

                    <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        {loader}
                        Submit Judgement
                    </button>
                </div>
            )
        } else if (this.state.markingDone) {
            innerCard = (
                <div className="card-body">
                    <h5 className="card-title text-center">All Done!</h5>
                    <div className="text-center icon-area">
                        <i class=" fas fa-8x fa-check-circle"/>
                    </div>
                    <div className="row">
                        <div className="col col-sm-12 text-center m-b-3">
                            Go back to judge more teams!
                        </div>
                    </div>

                    <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="button"
                        onClick={() => this.props.history.push('/')}
                    >
                        Go Back
                    </button>
                </div>
            )
        } else {
            if (id !== '') {
                this.props.firebase.set('/teams/' + id + '/post_added', true)
            }
            innerCard = (
                <div className="card-body">
                    <h5 className="card-title text-center">Uh Oh!</h5>
                    <div className="text-center icon-area">
                        <i class=" fas fa-8x fa-question-circle"/>
                    </div>
                    <div className="row">
                        <div className="col col-sm-12 text-center m-b-3">
                            Team ID {id} doesn't seem to exist. We'll create it for you in a sec!
                        </div>
                    </div>

                    <button
                        className="btn btn-lg btn-danger btn-block text-uppercase"
                        type="button"
                        onClick={() => this.props.history.push('/')}
                    >
                        Go Back
                    </button>
                </div>
            )
        }
        return (
            <LoadingScreen
                loading={!isLoaded(this.props.team)}
                bgColor="#f1f1f1"
                spinnerColor="#9ee5f8"
                textColor="#676767"
                logoSrc={logo}
                text="Fetching Data"
            >
                <div className="container">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-10 col-lg-7 mx-auto">
                                <div className="card card-container my-5">{innerCard}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingScreen>
        )
    }
}

const enhance = compose(
    firebaseConnect(props => [{path: 'teams/' + props.match.params.id}]),
    connect((state, props) => ({
        team: state.firebase.data.teams
    }))
)

export default enhance(MarkingList)
