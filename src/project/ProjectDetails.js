/**
 * Created by tarva on 31.10.2017.
 */

import React, {Component} from "react";
import ProjectView from "./ProjectView";
import ProjectForm from "./ProjectForm";

export default class ProjectDetails extends Component {
    // props: isFormView
    // props: projectView and projectForm props

    render() {

        return (
            this.props.isFormView ?
                <ProjectForm project={this.props.project} submitForm={this.props.submitForm}
                             cancelForm={this.props.cancelForm}/> :
                <ProjectView project={this.props.project}
                             isTimerRunning={this.props.isTimerRunning}
                             setTimerRunning={this.props.setTimerRunning}
                             setProjectFormEdit={this.props.setProjectFormEdit}
                             updateProject={this.props.updateProject}
                             deleteProject={this.props.deleteProject}
                             updateChecklistItem={this.props.updateChecklistItem}
                             addChecklistItem={this.props.addChecklistItem}/>
        )
    }
}