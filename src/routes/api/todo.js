const FAUNA_URL = import.meta.env.VITE_FAUNA_URL;
const FAUNA_TOKEN = import.meta.env.VITE_FAUNA_TOKEN;

export async function get() {
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
		return {
			body: await res.json()
		};
	}
	return {
		status: res.status,
		error: new Error()
	};
}

export async function post(req) {
	let variables = JSON.parse(req.body);

	const CREATETODO_MUTATION = `
		mutation createTodo(
				$text: String!
    		$done: Boolean!
    	){
			createTodo(data: {
				text: $text
    		done: $done
			})
			{
				_id
				text
				done
			}
		}`;
	const res = await fetch(FAUNA_URL.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_TOKEN.toString()
		},
		body: JSON.stringify({
			query: CREATETODO_MUTATION,
			variables
		})
	});

	if (res.ok) {
		return {
			body: await res.json()
		};
	}
	return {
		status: res.status,
		error: new Error()
	};
}

export async function put(req) {
	let variables = JSON.parse(req.body);
	console.log("PUT variables", variables)
	const UPDATEETODO_MUTATION = `
		mutation updateTodo($_id: ID!, $text: String!, $done: Boolean!){
			updateTodo(
				id: $_id,
				data: {
					text: $text
					done: $done
				}
			)
			{
					_id
					text
					done
			}
		}`;
	const res = await fetch(FAUNA_URL.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_TOKEN.toString()
		},
		body: JSON.stringify({
			query: UPDATEETODO_MUTATION,
			variables
		})
	});

	if (res.ok) {
		return {
			body: await res.json()
		};
	}
	return {
		status: res.status,
		error: new Error()
	};
}

export async function del(req) {
	let variables = JSON.parse(req.body);

	const DELTETODO_MUTATION = `
		mutation deleteTodo($id: ID!) {
			deleteTodo(id:$id){
				_id
				text
				done
			}
		}`;
	const res = await fetch(FAUNA_URL.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: FAUNA_TOKEN.toString()
		},
		body: JSON.stringify({
			query: DELTETODO_MUTATION,
			variables
		})
	});

	if (res.ok) {
		return {
			body: await res.json()
		};
	}
	return {
		status: res.status,
		error: new Error()
	};
}
