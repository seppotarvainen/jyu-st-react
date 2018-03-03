/**
 * Created by tarva on 13.1.2018.
 */
import React, {Component} from "react";

export default class ChecklistView extends Component {
    constructor(props) {
        super(props);

        this.clickAddItem = this.clickAddItem.bind(this);
    }

    clickAddItem() {
        this.props.setEditMode(true);
    }

    render() {
        const checklistItems = this.props.checklist.map(listItem => <li key={listItem.id}>{listItem.content}</li>);

        return (
            <div>
                <h3>Checklist</h3>
                <ul>
                    {checklistItems}
                </ul>
                <button className="btn btn-default" onClick={this.clickAddItem}>Add item</button>
            </div>
        )
    }
}