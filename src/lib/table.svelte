<script lang="ts">
	export let data:
		| {
				[key: string]: string[][];
		  }
		| undefined = undefined;

	let getHeaders = (data: any) => {
		return data ? Object.keys(data) : [];
	};
</script>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th colspan="1" />
				{#each getHeaders(data) as title}
					<th>{title}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each getHeaders(data) as _, colIndex}
				<!-- iterate over each desired column index -->
				<tr>
					<td>{colIndex}</td>
					{#each data ? Object.values(data) : [] as row}
						<td>
							<div class="flex flex-col">
								{#each row as subRow}
									<div>
										{subRow[colIndex]}
									</div>
								{/each}
							</div>
						</td>
						<!-- pick the appropriate value for each column from the original row data -->
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
