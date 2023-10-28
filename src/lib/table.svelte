<script lang="ts">
	export let data: any = undefined;

	let getBinanceHeaders = (binanceData: any) => {
		return Object.keys(binanceData[0]);
	};

	let getBinanceData = (binanceData: any) => {
		return Object.values(binanceData) as any[];
	};
</script>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th />
				{#each getBinanceHeaders(data) as title}
					<th>{title}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each getBinanceData(data) as row, i}
				<tr>
					<th>{i}</th>
					{#each Object.values(row) as value}
						<td>{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
