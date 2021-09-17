<script context="module">
	const FAUNA_URL = 'https://graphql.fauna.com/graphql';
	const FAUNA_TOKEN =
		'Basic Zm5BRU5EYmRxLUFDQk9Iem81M0ZUUnRtdzY4LVFPUDZjU3hZbHRJUDpUb2RvQXBwOmFkbWlu';
	const ALLTODOS_QUERY = `
		query allTodos{
			allTodos{
				data{
					_id
					text
					done
				}
			}
		}`;

	export async function load({ page, fetch }) {
		const res = await fetch(FAUNA_URL.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: FAUNA_TOKEN.toString()
			},
			body: JSON.stringify({
				query: ALLTODOS_QUERY
			})
		});

		if (res.ok) {
			const allTodos = await res.json();
			return {
				props: {
					allTodos: allTodos.data.allTodos.data
				}
			};
		}
		return {
			status: res.status,
			error: new Error()
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
</script>

<h1 class="text-3xl font-sans font-bold text-center py-5">To do app</h1>
<div class="bg-gray-200 rounded rounded px-20 py-5 grid grid-cols-2 gap-20">
	<TodoList todoList={allTodos} title="GQL: To do list" />
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
