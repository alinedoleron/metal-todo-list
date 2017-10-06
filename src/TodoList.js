'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {
	handleAddTask_(event) {
		let newTask = {
			description: event.target.value,
			done: false,
			archived: "visible"
		}

		this.setState({tasks: this.tasks.concat(newTask)});

		event.target.value = "";
	}

	handleCheckTask_(event) {
		let index = event.delegateTarget.getAttribute("data-index");
		let tempTask = {
			description: this.tasks[index].description,
			done: !this.tasks[index].done,
			archived: this.tasks[index].archived
		}

		this.tasks.splice(index, 1, tempTask);
		this.setState({tasks: this.tasks});
	}

	handleRemoveTask_(event) {
		let index = event.target.getAttribute("data-index");
		let visibility;
		if (this.tasks[index].archived == "hidden") {
			visibility = "visible";
		} else {
			visibility = "hidden"
		}
		let tempTask = {
			description: this.tasks[index].description,
			done: this.tasks[index].done,
			archived: visibility
		}

		this.tasks.splice(index, 1, tempTask);
		this.setState({tasks: this.tasks});

	}

	chooseTab_(event) {
		let tabId = event.target.getAttribute("data-tab");
		this.setState({tabSelected: tabId.toString()});
	}

}


TodoList.STATE = {
	tasks: {
		value: [
		{
			description: "Aline",
			done: false,
			archived: "visible"
		},
		{
			description: "Lianne",
			done: false,
			archived: "hidden"
		},
	]
	},

	tabSelected: {
		value: ""
	}
	
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
