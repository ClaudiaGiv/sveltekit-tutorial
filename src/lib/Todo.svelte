<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let todo;
	export let text = todo.text
	console.log(todo.text)
	console.log(text)
</script>

<div class="bg-white shadow rounded hover:border-indigo-600 my-3">
	<div class="grid grid-cols-6" >
		<input
			on:change={() => {console.log('t', text);dispatch('edit', {text})}}
			type="text"
			placeholder="To do item"
			class="focus:outline-none focus:ring focus:border-blue-300 p-2 col-span-4"
			class:strikethrough-text={todo.done}
			bind:value={text}
		/>

		<button
			class="h-8 m-2 text-sm text-green-700 transition-colors rounded-lg hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
			disabled='{todo.done}'
			on:click={() => dispatch('done')}
			data-tooltip='Mark as done'
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-check-lg h-5 w-5 mx-auto"
				viewBox="0 0 16 16"
			>
				<path
					d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
				/>
			</svg>
		</button>
		<button
			class="h-8 m-2 text-sm text-red-700 transition-colors rounded-lg hover:bg-red-100"
			on:click={() => dispatch('remove')}
			data-tooltip='Remove'
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 mx-auto"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.strikethrough-text{
			text-decoration: line-through;
	}
</style>
