/**
 * Created by tarva on 13.1.2018.
 */
import React, {Component} from "react";
import ChecklistForm from "./ChecklistForm";
import ChecklistView from "./ChecklistView";

export default class ChecklistDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
        };

        this.handleSetEditMode = this.handleSetEditMode.bind(this);
    }

    handleSetEditMode(editMode) {
        this.setState({isEditMode: editMode})
    }

    render() {
        return (
            this.state.isEditMode ?
                <ChecklistForm projectId={this.props.projectId} addChecklistItem={this.props.addChecklistItem}
                               setEditMode={this.handleSetEditMode}/> :
                <ChecklistView checklist={this.props.checklist} setEditMode={this.handleSetEditMode}/>
        )
    }
}