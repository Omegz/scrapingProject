<script lang="ts">
    export let data;
  
    // The data will be received as a prop from the server
    console.log(data);
  </script>
  

<pre class="bg-red-200">{JSON.stringify(data, null, 2)}</pre>

<h1>Funding Rate Data:</h1>
<pre class="bg-yellow-200">{JSON.stringify(data.binanceFundingRateData, null, 2)}</pre>











 <div class="p-6">



  {#if data.okexData}
    <h1>Okex Data:</h1>
    <p>Funding Rate: {data.okexData.fundingRate}</p>
    <p>Funding Time: {data.okexData.fundingTime}</p>
    <p>InstId: {data.okexData.instId}</p>
    <p>InstType: {data.okexData.instType}</p>
    <p>Next Funding Rate: {data.okexData.nextFundingRate}</p>
    <p>Next Funding Time: {data.okexData.nextFundingTime}</p>
  {:else}
    <p>No data available.</p>
  {/if}

</div>
  

<h1 class="p-2">Binance Data:</h1>

<div class="p-6">
  <h1>Premium Index</h1>
  
  {#if data.binanceData}
  <p>Symbol: {data.binanceData.symbol}</p>

  <p>Index Price: {data.binanceData.indexPrice}</p>
  <p>Mark Price: {data.binanceData.markPrice}</p>
  <p>I {data.binanceData.indexPrice}</p>
  <p>Estimated Settle Price: {data.binanceData.estimatedSettlePrice}</p>
  <p>Last Funding Rate: {data.binanceData.lastFundingRate}</p>
  <p>Next Funding Time: {data.binanceData.nextFundingTime}</p>
  <p>Interest Rate: {data.binanceData.interestRate}</p>
  <p>Time: {data.binanceData.time}</p>
  {:else}
  <p>No data available.</p>
  {/if}

</div>
  




<div class="p-6 ">
    
{#if data.binanceFundingRateData}
    <h2>Funding Rate Data:</h2>
    {#each data.binanceFundingRateData as fundingRateItem}
      <p>Symbol: {fundingRateItem.symbol}</p>
      <p>Funding Rate: {fundingRateItem.fundingRate}</p>
      <p>Funding Time: {fundingRateItem.fundingTime}</p>
    {/each}
  {/if}

</div>
<div class="grid grid-cols-5  gap-4 w-full ">
  <!-- Row 1 -->
  <div class=" flex w-full">
  <div class="grid-cell"> <p>Symbol: {data.symbol}</p></div>
  <div class="grid-cell flex flex-col p-12">
    
    
    {#if data.fundingRateData}
    
    {#each data.fundingRateData as fundingRateItem}
    
      <p>Funding Rate: {fundingRateItem.fundingRate}</p>
      <p>Funding Time: {fundingRateItem.fundingTime}</p>
    {/each}
  {/if}


    <p>Next Funding Time: {data.nextFundingTime}</p>

    <p>Estimated Settle Price: {data.estimatedSettlePrice}</p>
  </div>
  <div class="grid-cell">Cell 3</div>
  <div class="grid-cell">Cell 4</div>
  <div class="grid-cell">Cell 5</div>
</div>
  
</div>

<style>
  /* Include the Tailwind CSS here, either by importing it or by adding the CDN link to your main HTML file */
  /* For simplicity, I'm using some basic styles here */
  .grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    height:400px;
    width: 400px;
 
  }
</style>
