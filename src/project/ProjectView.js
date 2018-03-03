/**
 * Created by tarva on 31.10.2017.
 */
import React, {Component} from "react";
import Timer from "../timer/Timer";

export default class ProjectView extends Component {

    // props: project
    constructor(props) {
        super(props);

        this.updateTime = this.updateTime.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
    }

    updateTime(time) {
        let updatedProject = Object.assign(this.props.project);
        updatedProject.timeInSeconds = time;
        this.props.updateProject(updatedProject);
    }

    deleteProject() {
        this.props.deleteProject(this.props.project);
    }

    toggleDone() {
        let updatedProject = Object.assign(this.props.project);
        updatedProject.done = !updatedProject.done;
        this.props.updateProject(updatedProject);
    }

    render() {
        let isProjectSelected = Boolean(this.props.project);

        return (
            <div>
                <div className="row">
                    <h1>{isProjectSelected ? this.props.project.title : "No selected project"}
                        {isProjectSelected && this.props.project.done ?
                            <span className="glyphicon glyphicon-ok small"></span> : null}
                    </h1>
                    <p className="lead">{isProjectSelected ? this.props.project.description : ""}</p>
                    <hr />
                    {isProjectSelected ?
                        <Timer timeInSeconds={this.props.project.timeInSeconds} updateTime={this.updateTime}/> : null}
                </div>

                <br />
                {isProjectSelected ?
                    <div>
                        <div className="row">
                            <button type="button" className="btn btn-danger" onClick={this.deleteProject}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"/> Delete project
                            </button>
                        </div>
                        <div className="row">
                            <br />
                            <input type="checkbox" id="markDone" onChange={this.toggleDone}
                                   checked={this.props.project.done}/>&ensp;
                            <label htmlFor="markDone">Mark project as done</label>
                        </div>
                    </div> :
                    null}
            </div>
        )
    }

}