<script lang="ts">
	import { onMount } from 'svelte';

	type ResponseType = {
		binanceData: {
			symbol: string;
			markPrice: number;
			indexPrice: number;
			estimatedSettlePrice: number;
			lastFundingRate: number;
			nextFundingTime: string;
			interestRate: number;
			time: string;
		}[];
		binanceFundingRateData: {
			symbol: string;
			fundingRate: number;
			fundingTime: string;
		}[];
		okexFundingRateData: {
			instId: string;
			instType: string;
			fundingRate: number;
			nextFundingRate: number;
			fundingTime: string;
			nextFundingTime: string;
		}[];
	};

	let data: ResponseType | undefined;

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/api/crypto-data'); // Update the URL accordingly
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
		<h1>Binance Data:</h1>
		<ul>
			{#each data.binanceData as binanceItem}
				<li class="p-6 bg-green-200">
					<p>Symbol: {binanceItem.symbol}</p>
					<p>Mark Price: {binanceItem.markPrice}</p>
					<p>Index Price: {binanceItem.indexPrice}</p>
					<p>Estimated Settle Price: {binanceItem.estimatedSettlePrice}</p>
					<p>Last Funding Rate: {binanceItem.lastFundingRate}</p>
					<p>Next Funding Time: {binanceItem.nextFundingTime}</p>
					<p>Interest Rate: {binanceItem.interestRate}</p>
					<p>Time: {binanceItem.time}</p>
				</li>
			{/each}
		</ul>

		<h1>Binance Funding Rate Data:</h1>
		<ul>
			{#each data.binanceFundingRateData as fundingRateItem}
				<li class="p-6 bg-yellow-200">
					<p>Symbol: {fundingRateItem.symbol}</p>
					<p>Funding Rate: {fundingRateItem.fundingRate}</p>
					<p>Funding Time: {fundingRateItem.fundingTime}</p>
				</li>
			{/each}
		</ul>

		<h1>Okex Funding Rate Data:</h1>
		<ul>
			{#each data.okexFundingRateData as okexRate}
				<li class="p-6 bg-blue-200">
					<p>Instrument ID: {okexRate.instId}</p>
					<p>Instrument Type: {okexRate.instType}</p>
					<p>Funding Rate: {okexRate.fundingRate}</p>
					<p>Next Funding Rate: {okexRate.nextFundingRate}</p>
					<p>Funding Time: {okexRate.fundingTime}</p>
					<p>Next Funding Time: {okexRate.nextFundingTime}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No data available.</p>
	{/if}
</main>

<style>
	/* Add your styles here */
</style>
