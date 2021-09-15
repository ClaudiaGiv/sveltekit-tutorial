<script>
	import Todo from '../lib/Todo.svelte';

	function editTodo(index, e) {
		console.log(index);

		gqlTodos[index].text = e.detail.text;
		console.log(gqlTodos);
	}
	function addNewTodo() {
		console.log('add');

		gqlTodos = [...gqlTodos, { id: gqlTodos.length + 1, text: '', done: false }];
		console.log(gqlTodos);
	}

	function removeTodo(index) {
		console.log('remove');
		console.log(index);
		console.log(gqlTodos);

		gqlTodos.splice(index, 1);
		gqlTodos = gqlTodos;
		console.log(gqlTodos);
	}

	let fqlTodos = [
		{ id: 1, text: 'Buy milk', done: false },
		{ id: 2, text: 'Buy bread', done: false },
		{ id: 3, text: 'Buy water', done: false }
	];

	let gqlTodos = [
		{ id: 1, text: 'Buy milk', done: false },
		{ id: 2, text: 'Buy bread', done: false },
		{ id: 3, text: 'Buy water', done: false }
	];
	function markAsDone(index) {
		fqlTodos[index].done = true;
	}
	$: console.log(gqlTodos);
</script>

<h1 class="text-3xl font-sans font-bold text-center py-5">To do app</h1>
<div class="bg-gray-200 rounded rounded px-20 py-5 grid grid-cols-2 gap-20">
	<div class=" mx-20 ">
		<h1 class="text-2xl font-sans font-semibold text-red-600">GQL: To do</h1>
		{#each gqlTodos as todo, index}
			<Todo
				{todo}
				on:remove={() => removeTodo(index)}
				on:edit={(e) => editTodo(index, e)}
				on:done={() => {
					console.log('done');
					todo.done = true;
				}}
			/>
		{/each}
		<button
			on:click={addNewTodo}
			class="flex items-center mt-1 px-4 py-2 font-medium text-sm text-white bg-gray-800 rounded-md hover:bg-gray-700"
		>
			<svg class="h-5 w-5" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 4v16m8-8H4"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span>Add to do</span>
		</button>
	</div>

	<div class=" mx-20 ">
		<h1 class="text-2xl font-sans font-semibold text-blue-600">FQL: To do</h1>
		{#each fqlTodos as todo (todo.id)}
			<Todo {todo} on:remove={() => removeTodo(todo.id)} on:edit={() => editTodo(todo.id)} />
		{/each}
		<button
			on:click={addNewTodo}
			class="flex items-center mt-1 px-4 py-2 font-medium text-sm text-white bg-gray-800 rounded-md hover:bg-gray-700"
		>
			<svg class="h-5 w-5" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 4v16m8-8H4"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span>Add to do</span>
		</button>
	</div>
</div>
