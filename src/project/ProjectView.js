/**
 * Created by tarva on 31.10.2017.
 */
import React, {Component} from "react";
import Timer from "../timer/Timer";
import ChecklistDetails from "../checklist/ChecklistDetails";

export default class ProjectView extends Component {

    // props: project
    constructor(props) {
        super(props);

        this.updateTime = this.updateTime.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.clickEditProject = this.clickEditProject.bind(this);
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

    clickEditProject() {
        this.props.setProjectFormEdit(this.props.project);
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
                        <Timer timeInSeconds={this.props.project.timeInSeconds}
                               updateTime={this.updateTime}
                               setTimerRunning={this.props.setTimerRunning}
                        /> : null}
                </div>

                <br />
                {isProjectSelected ?
                    <div>
                        <div className="row">
                            <button disabled={this.props.isTimerRunning} type="button" className={"btn btn-default"}
                                    onClick={this.clickEditProject}>
                                Edit project
                            </button>
                            <button disabled={this.props.isTimerRunning} type="button" className={"btn btn-danger"}
                                    onClick={this.deleteProject}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"/> Delete project
                            </button>
                        </div>
                        <div className="row">
                            <br />
                            <input type="checkbox" id="markDone" onChange={this.toggleDone}
                                   checked={this.props.project.done}/>&ensp;
                            <label htmlFor="markDone">Mark project as done</label>
                        </div>
                        <div className="row">
                            <ChecklistDetails projectId={this.props.project.id}
                                              updateChecklistItem={this.props.updateChecklistItem}
                                              addChecklistItem={this.props.addChecklistItem}
                                              checklist={this.props.project.checklist}/>
                        </div>
                    </div> :
                    null}
            </div>
        )
    }

}