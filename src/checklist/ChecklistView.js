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
        const checklistItems = this.props.checklist.map(listItem => {
            return <ChecklistItem projectId={this.props.projectId}
                                  item={listItem} key={listItem.id}
                                  updateChecklistItem={this.props.updateChecklistItem}/>
        });

        return (
            <div>
                <h3>Checklist</h3>
                <ul className="checklist">
                    {checklistItems}
                </ul>
                <button className="btn btn-default" onClick={this.clickAddItem}>Add item</button>
            </div>
        )
    }
}

class ChecklistItem extends Component {

    constructor(props) {
        super(props);

        this.handleDone = this.handleDone.bind(this);
    }

    handleDone() {
        const item = Object.assign(this.props.item);
        item.done = !item.done;
        this.props.updateChecklistItem(item, this.props.projectId);
    }

    render() {
        const doneClass = this.props.item.done ? "done" : null;
        return (
            <li>
                <input id={"item-" + this.props.item.id} type="checkbox" onChange={this.handleDone}
                       checked={this.props.item.done}/>
                <label className={doneClass} htmlFor={"item-" + this.props.item.id}>{this.props.item.content}</label>
            </li>
        )
    }
}
