import React, {Component} from 'react'
import './ReviewComponent.css'

// Unused in production

export default class ReviewComponent extends Component {

    handleChange = e => {
        this.props.changeHandler(this.props.ident, e.value)
    }

    render() {
        return (
            <div className="row">
                <div className="col col-sm-12">
                    <div className="shadow-sm p-3 mb-3 bg-light rounded">
                        <div className="col col-sm-12 p-2 p-b-3 text-center">Any Suggestions?</div>
                        <div className="col col-sm-12 text-center">
                            <div class="form-group">
                                <textarea class="form-control" id="suggestions" rows="3"
                                          onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
