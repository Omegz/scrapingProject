<script lang="ts">
	import Table from '$lib/table.svelte';
	import { onMount } from 'svelte';

	let dataArray:
		| {
				[key: string]: string[][];
		  }[]
		| undefined;

	let getEntries = (data: typeof dataArray) => {
		return data ? Object.entries(data) : [];
	};

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/api/crypto-data'); // Update the URL accordingly
			console.log('fetched');
			if (response.ok) {
				dataArray = (await response.json()) as typeof dataArray;
			} else {
				console.error('Error fetching data:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMount(fetchData);
</script>

<main>
	{#if dataArray && Object.keys(dataArray).length > 0}
		{#each getEntries(dataArray) as entry}
			<h1>{entry[0]}:</h1>
			<Table data={entry[1]} />
		{/each}
	{:else}
		<p>No data available.</p>
	{/if}
</main>
