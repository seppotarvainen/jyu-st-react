/**
 * Created by tarva on 31.10.2017.
 */

import React, {Component} from "react";

export default class ProjectForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.project.title,
            description: this.props.project.description
        };

        this.handleChange = this.handleChange.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();

        let project = this.props.project;
        project.title = this.state.title;
        project.description = this.state.description;

        this.props.submitForm(project);
    }

    cancelForm() {
        this.props.cancelForm();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="row">
                    <h1>{this.state.title.length > 0 ? this.state.title : "Untitled project"}</h1>
                </div>
                <FormInput label="Title"
                           fieldName="title"
                           type="text"
                           value={this.state.title}
                           handleChange={this.handleChange}/>

                <FormInput label="Description"
                           fieldName="description"
                           type="textarea"
                           value={this.state.description}
                           handleChange={this.handleChange}/>

                <div className="form-group row">
                    <div className="col-sm-offset-2">
                        <button type="submit" className="btn btn-default">Submit</button>
                        &ensp;
                        <button type="submit" className="btn btn-default" onClick={this.cancelForm}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

class FormInput extends Component {

    render() {
        let input = this.props.type === "text" ?
            <input className="form-control" name={this.props.fieldName} type="text" value={this.props.value}
                   onChange={this.props.handleChange}/> :
            <textarea className="form-control" name={this.props.fieldName} type="text" value={this.props.value}
                      onChange={this.props.handleChange}/>;

        return (
            <div className="form-group row">
                <label className="col-sm-2">{this.props.label}</label>
                <div className="col-sm-10">
                    {input}
                </div>
            </div>
        )
    }

}