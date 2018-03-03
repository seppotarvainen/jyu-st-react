/**
 * Created by tarva on 31.10.2017.
 */

import React, {Component} from "react";

export default class ProjectList extends Component {

    render() {
        let projectList = this.props.projects;
        const projectListView = projectList.map((proj) => (

            <ProjectListItem key={proj.id}
                             project={proj}
                             isSelected={this.props.selectedProject ? proj.id === this.props.selectedProject.id : false}
                             handleSelect={this.props.handleSelect}/>)
        );

        return (
            <div>
                {projectListView}
            </div>
        );

    }
}

class ProjectListItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleSelect(this.props.project);
    }

    render() {
        let doneIcon = this.props.project.done ? <span className="glyphicon glyphicon-ok"/> : "";
        let className = "list-group-item";
        if (this.props.isSelected) {
            className += " list-group-item-info";
        }

        return (
            <div>
                <button onClick={this.handleClick} className={className}>{this.props.project.title} {doneIcon}</button>
            </div>);
    }
}