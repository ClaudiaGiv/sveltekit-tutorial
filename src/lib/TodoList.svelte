<script>
	import { createEventDispatcher } from 'svelte';
	import Todo from '../lib/Todo.svelte';

	const dispatch = createEventDispatcher();
	export let todoList;
	export let title;

	function editTodo(index, e) {
		todoList[index].text = e.detail.text;
		dispatch('edit', todoList[index]);
	}
	function addNewTodo() {
		todoList = [...todoList, { text: '', done: false }];
	}

	function removeTodo(id) {
		// todoList = todoList.filter((m) => m._id !== id);
		dispatch('remove', id);
	}

	function markAsDone(index) {
		todoList[index].done = true;
	}
	// $: console.log(todoList);
</script>

<div class=" mx-20 ">
	<h1 class="text-2xl font-sans font-semibold text-blue-600">{title}</h1>
	{#each todoList as todo, index}
		<Todo
			{todo}
			on:remove={() => removeTodo(todo._id)}
			on:edit={(e) => editTodo(index, e)}
			on:done={() => markAsDone(index)}
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
