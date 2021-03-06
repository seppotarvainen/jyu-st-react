import React, {Component} from "react";
import "./App.css";
import ProjectDetails from "./project/ProjectDetails";
import ProjectList from "./project/ProjectList";
import HttpCall from "./utils/HttpCall";
import BaseURL from "./utils/BaseURL";
import "bootstrap/dist/css/bootstrap.css";

/**
 * Parent component. Controls the list of projects.
 */
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            isTimerRunning: false,
            selectedProject: null,
            isFormView: false
        };

        this.setSelectedProject = this.setSelectedProject.bind(this);
        this.setProjectFormAdd = this.setProjectFormAdd.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.cancelProjectForm = this.cancelProjectForm.bind(this);
        this.submitProjectForm = this.submitProjectForm.bind(this);
        this.setProjectView = this.setProjectView.bind(this);
        this.setProjectFormEdit = this.setProjectFormEdit.bind(this);
        this.handleSubmitEditForm = this.handleSubmitEditForm.bind(this);
        this.handleSubmitNewForm = this.handleSubmitNewForm.bind(this);
        this.setTimerRunning = this.setTimerRunning.bind(this);
        this.addProjectChecklistItem = this.addProjectChecklistItem.bind(this);
        this.updateProjectChecklistItem = this.updateProjectChecklistItem.bind(this);
        this.deleteDoneProjectChecklistItems = this.deleteDoneProjectChecklistItems.bind(this);
    }

    componentDidMount() {
        this.projects = HttpCall.get(BaseURL.base, (projects) => {
            this.setState({
                projects: projects
            });
        });
    }

    /**
     * Sets project selected.
     * @param project - Project object
     */
    setSelectedProject(project) {
        if (this.state.isTimerRunning) return;

        this.setState({selectedProject: project});
    }

    generateEmpyProject() {
        return {
            "description": "",
            "done": false,
            "id": null,
            "timeInSeconds": 0,
            "title": ""
        }
    }

    setProjectFormAdd() {
        if (this.state.isTimerRunning) return;

        let emptyProject = this.generateEmpyProject();
        this.setProjectView(emptyProject, true);
    }

    setProjectFormEdit(project) {
        if (this.state.isTimerRunning) return;

        this.setProjectView(project, true);
    }

    submitProjectForm(project) {
        if (project.id === null)
            this.handleSubmitNewForm(project);
        else
            this.handleSubmitEditForm(project)
    }

    handleSubmitNewForm(project) {
        let callback = (data) => {
            this.setState({
                projects: this.state.projects.concat(data),
                selectedProject: data,
                isFormView: false
            });
        };

        HttpCall.post(BaseURL.base, callback, project);
    }

    handleSubmitEditForm(project) {

        let callback = (data) => {
            this.setState({
                projects: this.state.projects.map(p => p.id === project.id ? project : p),
                selectedProject: data,
                isFormView: false
            })
        };

        const url = BaseURL.singleProject.replace("{1}", project.id);

        HttpCall.put(url, callback, project);
    }

    cancelProjectForm(project) {
        this.setProjectView(project, false);
    }

    setProjectView(selectedProject, isFormView) {
        this.setState({
            selectedProject: selectedProject,
            isFormView: isFormView
        })
    }

    /**
     * Update project
     * @param project - Project object
     */
    updateProject(project) {
        let callback = (updtedProject) => {
            let index = this.state.projects.findIndex(p => p.id === updtedProject.id);
            let allProjects = this.state.projects.slice(0);
            allProjects[index] = updtedProject;
            this.setState({
                projects: allProjects
            })
        };

        const url = BaseURL.singleProject.replace("{1}", project.id);

        HttpCall.put(url, callback, project);
    }

    deleteProject(project) {
        if (this.state.isTimerRunning) return;

        let callback = () => {
            let index = this.state.projects.findIndex(p => project.id === p.id);
            let allProjects = this.state.projects.slice();
            allProjects.splice(index, 1);

            this.setState({
                selectedProject: null,
                projects: allProjects
            });
        };

        const url = BaseURL.singleProject.replace("{1}", project.id);

        HttpCall.delete(url, callback);
    }

    addProjectChecklistItem(item, projectId) {

        let callback = response => {
            let allProjects = this.state.projects.slice();
            let index = allProjects.findIndex(p => projectId === p.id);
            allProjects[index].checklist = allProjects[index].checklist.concat(response);

            this.setState({
                projects: allProjects
            });
        };

        HttpCall.post(BaseURL.singleProjectChecklist.replace('{1}', projectId), callback, item);
    }

    updateProjectChecklistItem(item, projectId) {

        let callback = response => {
            let allProjects = this.state.projects.slice();
            let index = allProjects.findIndex(p => projectId === p.id);
            allProjects[index].checklist = allProjects[index].checklist.map(listItem => item.id === listItem.id ? response : listItem);

            this.setState({
                projects: allProjects
            });
        };

        HttpCall.put(BaseURL.singleProjectChecklistItem.replace('{1}', projectId).replace('{2}', item.id), callback, item);
    }

    deleteDoneProjectChecklistItems(projectId) {
        let callback = () => {
            let allProjects = this.state.projects.slice();
            let index = allProjects.findIndex(p => projectId === p.id);
            allProjects[index].checklist = allProjects[index].checklist.filter(item => !item.done);

            this.setState({
                projects: allProjects
            });
        };

        HttpCall.delete(BaseURL.singleProjectChecklist.replace('{1}', projectId), callback);
    }


    setTimerRunning = function (isRunning) {
        this.setState({isTimerRunning: isRunning});
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">React</a>
                    </div>
                </nav>
                <div className="container">

                    <div>
                        <div className="col-sm-3">
                            <br />
                            <h3>
                                <small><strong>PROJECTS</strong></small>
                            </h3>
                            <ProjectList projects={this.state.projects}
                                         isTimerRunning={this.state.isTimerRunning}
                                         handleSelect={this.setSelectedProject}
                                         selectedProject={this.state.selectedProject}/>
                            <br />
                            <button className="btn btn-default" disabled={this.state.isTimerRunning}
                                    onClick={this.setProjectFormAdd}>
                                <span className="glyphicon glyphicon-plus" aria-hidden="true"/> Add project
                            </button>
                        </div>
                        <div className="col-sm-9">
                            <ProjectDetails project={this.state.selectedProject}
                                            updateProject={this.updateProject}
                                            isFormView={this.state.isFormView}
                                            isTimerRunning={this.state.isTimerRunning}
                                            setTimerRunning={this.setTimerRunning}
                                            submitForm={this.submitProjectForm}
                                            cancelForm={this.cancelProjectForm}
                                            deleteProject={this.deleteProject}
                                            addChecklistItem={this.addProjectChecklistItem}
                                            updateChecklistItem={this.updateProjectChecklistItem}
                                            deleteDoneChecklistItems={this.deleteDoneProjectChecklistItems}
                                            setProjectFormEdit={this.setProjectFormEdit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
