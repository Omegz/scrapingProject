<script lang="ts">
	import Table from '$lib/table.svelte';
	import { onMount } from 'svelte';

	let data: any | undefined;

	let dataMeta = [
		{
			title: 'Binance Data',
			dataKey: 'binanceData'
		},
		{
			title: 'Binance Funding Rate Data',
			dataKey: 'binanceFundingRateData'
		},
		{
			title: 'Okex Funding Rate Data',
			dataKey: 'okexFundingRateData'
		}
	];

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/api/crypto-data'); // Update the URL accordingly
			console.log('fetched');
			if (response.ok) {
				data = await response.json();
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
	{#if data && Object.keys(data).length > 0}
		{#each dataMeta as meta}
			<h1>{meta.title}:</h1>
			<Table data={data[meta.dataKey]} />
		{/each}
	{:else}
		<p>No data available.</p>
	{/if}
</main>
