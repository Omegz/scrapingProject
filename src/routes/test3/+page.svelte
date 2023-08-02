<script lang="ts">
    export let data;
  
    // The data will be received as a prop from the server
    console.log(data);
  </script>

  <!-- Display Binance Data -->
{#if data.binanceData}
{#each data.binanceData as binanceItem}
  <div class="bg-yellow-200 p-6">
    <h1>Binance Data - Symbol: {binanceItem.symbol}</h1>
    <p>Mark Price: {binanceItem.markPrice}</p>
    <p>Index Price: {binanceItem.indexPrice}</p>
    <p>Estimated Settle Price: {binanceItem.estimatedSettlePrice}</p>
    <p>Last Funding Rate: {binanceItem.lastFundingRate}</p>
    <p>Next Funding Time: {binanceItem.nextFundingTime}</p>
    <p>Interest Rate: {binanceItem.interestRate}</p>
    <p>Time: {binanceItem.time}</p>
  </div>
{/each}
{:else}
<p>No Binance data available.</p>
{/if}

  
  <!-- Display Binance Data -->
  {#if data.binanceData}
  <div class="bg-green-200 p-6">
    <h1>Binance Data:</h1>
    <p>Symbol: {data.binanceData.symbol}</p>
    <p>Mark Price: {data.binanceData.markPrice}</p>
    <p>Index Price: {data.binanceData.indexPrice}</p>
    <p>Estimated Settle Price: {data.binanceData.estimatedSettlePrice}</p>
    <p>Last Funding Rate: {data.binanceData.lastFundingRate}</p>
    <p>Next Funding Time: {data.binanceData.nextFundingTime}</p>
    <p>Interest Rate: {data.binanceData.interestRate}</p>
    <p>Time: {data.binanceData.time}</p>
  </div>
  {:else}
  <p>No Binance data available.</p>
  {/if}
  
  <!-- Display Binance Funding Rate Data -->
  {#if data.binanceFundingRateData}
  <div class=" bg-red-200 p-6">
    <h1>Binance Funding Rate Data:</h1>
    {#each data.binanceFundingRateData as fundingRateItem}
      <p>Symbol: {fundingRateItem.symbol}</p>
      <p>Funding Rate: {fundingRateItem.fundingRate}</p>
      <p>Funding Time: {fundingRateItem.fundingTime}</p>
    {/each}
  </div>
  {:else}
  <p>No Binance Funding Rate data available.</p>
  {/if}
  
  <!-- Display Okex Data -->
  {#if data.okexData}
  <div class="p-6">
    <h1>Okex Data:</h1>
    <p>Funding Rate: {data.okexData.fundingRate}</p>
    <p>Funding Time: {data.okexData.fundingTime}</p>
    <p>InstId: {data.okexData.instId}</p>
    <p>InstType: {data.okexData.instType}</p>
    <p>Next Funding Rate: {data.okexData.nextFundingRate}</p>
    <p>Next Funding Time: {data.okexData.nextFundingTime}</p>
  </div>
  {:else}
  <p>No Okex data available.</p>
  {/if}
  

  {#if data.okexData}
  <h1>Okex Data:</h1>
  <ul>
    <li><strong>Instrument Type:</strong> {data.okexData.instType}</li>
    <li><strong>Instrument ID:</strong> {data.okexData.instId}</li>
    <li><strong>Funding Rate:</strong> {data.okexData.fundingRate}</li>
    <li><strong>Next Funding Rate:</strong> {data.okexData.nextFundingRate}</li>
    <li><strong>Funding Time:</strong> {data.okexData.fundingTime}</li>
    <li><strong>Next Funding Time:</strong> {data.okexData.nextFundingTime}</li>
  </ul>
  
  {:else}
  
  <h1>no tor wokr</h1>
  {/if}
  