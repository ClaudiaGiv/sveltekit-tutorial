<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('api/todo');
		let error;
		let status = res.status >= 400 ? res.status : 500;
		if (res.ok) {
			const response = await res.json();
			if (!response.errors)
				return {
					props: {
						allTodos: response.data.allTodos.data
					}
				};
			error = JSON.stringify(response.errors);
		}
		return {
			status,
			error: error || 'Request error'
		};
	}
</script>

<script>
	import TodoList from '../lib/TodoList.svelte';

	export let allTodos;
	console.log('todoList', allTodos);
	let gqlTodos = [
		{ _id: 1, text: 'Drink milk', done: false },
		{ _id: 2, text: 'Eat bread', done: false },
		{ _id: 3, text: 'Drink water', done: false }
	];

	function editTodo(e) {
		let todo = e.detail;
		if (todo._id === undefined) {
			createTodo(todo);
		}
	}

	async function createTodo(todo) {
		const res = await fetch('api/todo', {
			method: 'POST',
			body: JSON.stringify(todo)
		});
		let error;
		if (res.ok) {
			const response = await res.json();
			if (!response.errors) {
				allTodos = [...allTodos, response.data.createTodo.data];
				return;
			}
			error = JSON.stringify(response.errors);
		}
		console.log(error || res.statusText);
	}
</script>

<h1 class="text-3xl font-sans font-bold text-center py-5">To do app</h1>
<div class="bg-gray-200 rounded rounded px-20 py-5 grid grid-cols-2 gap-20">
	<TodoList todoList={allTodos} on:edit={editTodo} title="GQL: To do list" />
</div>

<svelte:head>
	<style>
		/*This would all go into the global.css file*/
		[data-tooltip] {
			position: relative;
			z-index: 2;
			display: block;
		}

		[data-tooltip]:before,
		[data-tooltip]:after {
			visibility: hidden;
			opacity: 0;
			pointer-events: none;
			transition: 0.2s ease-out;
			transform: translate(-50%, 5px);
		}

		[data-tooltip]:before {
			position: absolute;
			bottom: 100%;
			left: 50%;
			margin-bottom: 5px;
			padding: 7px;
			width: 100%;
			min-width: 70px;
			max-width: 250px;
			-webkit-border-radius: 3px;
			-moz-border-radius: 3px;
			border-radius: 3px;
			background-color: #000;
			background-color: hsla(0, 0%, 20%, 0.9);
			color: #fff;
			content: attr(data-tooltip);
			text-align: center;
			font-size: 14px;
			line-height: 1.2;
			transition: 0.2s ease-out;
		}

		[data-tooltip]:after {
			position: absolute;
			bottom: 100%;
			left: 50%;
			width: 0;
			border-top: 5px solid #000;
			border-top: 5px solid hsla(0, 0%, 20%, 0.9);
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
			content: ' ';
			font-size: 0;
			line-height: 0;
		}

		[data-tooltip]:hover:before,
		[data-tooltip]:hover:after {
			visibility: visible;
			opacity: 1;
			transform: translate(-50%, 0);
		}

		[data-tooltip='false']:hover:before,
		[data-tooltip='false']:hover:after {
			visibility: hidden;
			opacity: 0;
		}
	</style>
</svelte:head>
