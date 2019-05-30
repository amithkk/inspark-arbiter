import React, {Component} from 'react'
import './TeamPicker.css'

class TeamPicker extends Component {

    state = {team: ''}


    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.history.push('/judge/' + this.state.team.toUpperCase())
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Judge A Team</h5>
                                <form className="form-signin" onSubmit={this.handleSubmit}>
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="team"
                                            className="form-control"
                                            placeholder="Team ID"
                                            required
                                            autoFocus
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="team">Team ID</label>
                                    </div>
                                    <button
                                        className="btn btn-lg btn-primary btn-block text-uppercase"
                                        type="submit"
                                    >
                                        Lets Go!
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamPicker
