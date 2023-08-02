<script lang="ts">
    export let data;
  
    // The data will be received as a prop from the server
    console.log(data);
  </script>
  

<!-- <pre class="bg-red-200">{JSON.stringify(data, null, 2)}</pre> -->

<!-- <h1>Funding Rate Data:</h1>
<pre class="bg-yellow-200">{JSON.stringify(data.binanceFundingRateData, null, 2)}</pre>
 -->










 <div class="p-6">

    {#if data.binanceData}
  <h1>Binance Data:</h1>
  <p>Symbol: {data.binanceData.symbol}</p>
  <p>Mark Price: {data.binanceData.markPrice}</p>
  <p>Index Price: {data.binanceData.indexPrice}</p>
  <p>Estimated Settle Price: {data.binanceData.estimatedSettlePrice}</p>
  <p>Last Funding Rate: {data.binanceData.lastFundingRate}</p>
  <p>Next Funding Time: {data.binanceData.nextFundingTime}</p>
  <p>Interest Rate: {data.binanceData.interestRate}</p>
  <p>Time: {data.binanceData.time}</p>
{:else}
  <p>No Binance Data available.</p>
{/if}

{#if data.okexData}
  <h1>Okex Data:</h1>
  <p>Funding Rate: {data.okexData.fundingRate}</p>
  <p>Funding Time: {data.okexData.fundingTime}</p>
  <p>InstId: {data.okexData.instId}</p>
  <p>InstType: {data.okexData.instType}</p>
  <p>Next Funding Rate: {data.okexData.nextFundingRate}</p>
  <p>Next Funding Time: {data.okexData.nextFundingTime}</p>
{:else}
  <p>No Okex Data available.</p>
{/if}


    {#if data.binanceData}
    <h1>Binance Data:</h1>
    {#each data.okexData as item}
    <p>Symbol: {item.symbol}</p>
    <p>Mark Price: {item.markPrice}</p>
    <p>Index Price: {item.indexPrice}</p>
    <p>Estimated Settle Price: {data.binanceData.estimatedSettlePrice}</p>
    <p>Last Funding Rate: {data.binanceData.lastFundingRate}</p>
    <p>Next Funding Time: {data.binanceData.nextFundingTime}</p>
    <p>Interest Rate: {data.binanceData.interestRate}</p>
    <p>Time: {data.binanceData.time}</p>
    {/each}
    {:else}
    <p>No B Data available.</p>
  {/if}
    
  {#if data.binanceData}
    {#if data.binanceFundingRateData}
      <h1>Binance Funding Rate Data:</h1>
      {#each data.binanceFundingRateData as item}
        <p>Funding Rate: {item.fundingRate}</p>
        <p>Funding Time: {item.fundingTime}</p>
      {/each}
    {:else}
      <p>No Binance Funding Rate Data available.</p>
    {/if}
  
    {#if data.okexData}
      <h1>Okex Data:</h1>
      {#each data.okexData as item}
        <p>Funding Rate: {item.fundingRate}</p>
        <p>Funding Time: {item.fundingTime}</p>
        <p>InstId: {item.instId}</p>
        <p>InstType: {item.instType}</p>
        <p>Next Funding Rate: {item.nextFundingRate}</p>
        <p>Next Funding Time: {item.nextFundingTime}</p>
      {/each}
    {:else}
      <p>No Okex Data available.</p>
    {/if}
  
    {#if data.b}
      <h1>B Data:</h1>
      {#each data.b as item}
        <p>{item}</p>
      {/each}
    {:else}
      <p>No B Data available.</p>
    {/if}
  {:else}
    <p>No data available.</p>
  {/if}
  
    

    {#if data.okexData}
    <h1>Okex Data:</h1>
    {#each data.okexData as item}
      <p>Funding Rate: {item.fundingRate}</p>
      <p>Funding Time: {item.fundingTime}</p>
      <p>InstId: {item.instId}</p>
      <p>InstType: {item.instType}</p>
      <p>Next Funding Rate: {item.nextFundingRate}</p>
      <p>Next Funding Time: {item.nextFundingTime}</p>
    {/each}
  {:else}
    <p>No data available.</p>
  {/if}
  
</div>
  

<h1 class="p-2">Binance Data:</h1>

<div class="p-6">
  <h1>Premium Index</h1>
  
  {#if data.binanceData}
  console.log('hello')
  <p>hhh {data.binanceFundingRateData}</p>
  <!-- <p>Symbol: {data.binanceData.symbol}</p>

  <p>Index Price: {data.binanceData.indexPrice}</p>
  <p>Mark Price: {data.binanceData.markPrice}</p>
  <p>I {data.binanceData.indexPrice}</p>
  <p>Estimated Settle Price: {data.binanceData.estimatedSettlePrice}</p>
  <p>Last Funding Rate: {data.binanceData.lastFundingRate}</p>
  <p>Next Funding Time: {data.binanceData.nextFundingTime}</p>
  <p>Interest Rate: {data.binanceData.interestRate}</p>
  <p>Time: {data.binanceData.time}</p> -->
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


  
{#if data.binanceFundingRateData}
    
{#each data.binanceFundingRateData as fundingRateItem}

  <p>Funding Rate: {fundingRateItem.fundingRate}</p>
  <p>Funding Time: {fundingRateItem.fundingTime}</p>
{/each}
{/if}
<div class="grid grid-cols-5  gap-4 w-full ">
  <!-- Row 1 -->
  <div class=" flex w-full">
  <div class="grid-cell"> <p>Symbol: {data.symbol}</p></div>

  
  <div class="grid-cell flex flex-col p-[400px]">
    
    
    
    {#if data.binanceFundingRateData}
    
    {#each data.binanceFundingRateData as fundingRateItem}
    
      <p>Funding Rate: {fundingRateItem.fundingRate}</p>
      <p>Funding Time: {fundingRateItem.fundingTime}</p>
    {/each}
  {/if}


    <p>Next Funding Time: {data.binanceFundingRateData}</p>

    <p>Estimated Settle Price: {data.b}</p>
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
