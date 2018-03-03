/**
 * Created by tarva on 13.1.2018.
 */
import React, {Component} from "react";

export default class ChecklistForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setEditMode(false);
        this.props.addChecklistItem({content: this.state.content}, this.props.projectId);
    }

    handleChange(event) {
        this.setState({content: event.target.value})
    }

    cancelForm() {
        this.props.setEditMode(false);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="content" className="col-sm-2">Item content</label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   onChange={this.handleChange}
                                   id="content"
                                   name="content"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default">Submit</button>
                        <button type="button" className="btn btn-danger" onClick={this.cancelForm}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}