import React, {Component} from 'react'
import './MarkingComponent.css'

import Select from 'react-select'

export default class MarkingComponent extends Component {
    levels = [
        {value: 10, label: 'Excellent'},
        {value: 8, label: 'Very Good'},
        {value: 6, label: 'Good'},
        {value: 4, label: 'Fair'},
        {value: 2, label: 'Poor'}
    ]

    handleChange = e => {
        this.props.changeHandler(this.props.ident, e.value)
    }

    render() {
        return (
            <div className="row">
                <div className="col col-sm-12">
                    <div className="shadow-sm p-3 mb-3 bg-light rounded">
                        <div className="col col-sm-12 p-2 p-b-3 text-center">
                            {this.props.name}
                        </div>
                        <div className="col col-sm-12 text-center">
                            <Select
                                options={this.levels}
                                isSearchable={false}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
