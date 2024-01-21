<script>
	import { onMount } from 'svelte';

	let data = [];

	// This runs only in the browser
	onMount(async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/api/crypto-data');
			if (response.ok) {
				data = await response.json();
			} else {
				console.error('Error fetching data:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<main>
	{#if data.length > 0}
		<table>
			<thead>
				<tr>
					{#each Object.keys(data[0]) as key}
						<th>{key}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as row}
					<tr>
						{#each Object.values(row) as value}
							<td>{value}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>No data available.</p>
	{/if}
</main>
