<script>
	import Todo from '../lib/Todo.svelte';
	export let todoList
	export let title

	function editTodo(index, e) {
		console.log(index);

		todoList[index].text = e.detail.text;
		console.log(todoList);
	}
	function addNewTodo() {
		console.log('add');

		todoList = [...todoList, { id: todoList.length + 1, text: '', done: false }];
		console.log(todoList);
	}

	function removeTodo(index) {
		console.log('remove');
		console.log(index);
		console.log(todoList);

		todoList.splice(index, 1);
		todoList = todoList;
		console.log(todoList);
	}

	function markAsDone(index) {
		todoList[index].done = true;
	}
	$: console.log(todoList);
</script>

<div class=" mx-20 ">
	<h1 class="text-2xl font-sans font-semibold text-blue-600">{title}</h1>
	{#each todoList as todo, index}
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
