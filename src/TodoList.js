'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {

	handleAddTask_(event) {
		let index = this.tasks.length;
		let tempTask = {
			description: event.delegateTarget.value,
			done: false,
			showEdit: false
		}

		this.tasks.splice(index, 1, tempTask);
		this.setState({
			tasks: this.tasks
		});

		event.delegateTarget.value = "";
	}

	handleEditTask_(event) {
		let task = this.getTask(event.delegateTarget);
		task.showEdit = true;

		this.setState({
			tasks: this.tasks
		});
	}

	handleSaveEditTask_(event) {
		let task = this.getTask(event.delegateTarget);
		task.description = event.delegateTarget.value;
		task.showEdit = false;

		this.setState({
			tasks: this.tasks
		});
	}

	handleDoneTask_(event) {
		let task = this.getTask(event.delegateTarget);
		task.done = !task.done;

		this.setState({
			tasks: this.tasks
		});
	}

	handleRemoveTask_(event) {
		let index = this.getIndex(event.delegateTarget);

		this.tasks.splice(index, 1);
		this.setState({
			tasks: this.tasks
		});
	}

	//get current task
	getTask(event) {
		return this.tasks[event.getAttribute("data-index")];
	}

	//get current index
	getIndex(event) {
		return event.getAttribute("data-index");
	}
}


TodoList.STATE = {
	tasks: {
		value: [{
				description: 'task 01',
				done: false,
				showEdit: false,
			},
			{
				description: 'task 02',
				done: true,
				showEdit: false,
			},
			{
				description: 'task 03',
				done: false,
				showEdit: false,
			}
		]
	},
	editTask: {
		value: {
			description: '',
			index: 0,
			show: false
		}
	}
}

Soy.register(TodoList, templates);

export {
	TodoList
};
export default TodoList;
