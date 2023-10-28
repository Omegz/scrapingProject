<script lang="ts">
    export let data;
  
    // The data will be received as a prop from the server
    console.log(data);
  </script>


{#if data && data.okexFundingRateData}
<h1>Okex Data:</h1>
<ul>
    {#each data.okexFundingRateData as rate}
    <div class="bg-blue-200 p-6">
      <h1>Okex Data - Instrument ID: {rate.instId}</h1>
      <p>Instrument Type: {rate.instType}</p>
      <p>Funding Rate: {rate.fundingRate}</p>
      <p>Next Funding Rate: {rate.nextFundingRate}</p>
      <p>Funding Time: {rate.fundingTime}</p>
      <p>Next Funding Time: {rate.nextFundingTime}</p>
    </div>
  {/each}
</ul>
{/if}


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
  
  
 

  