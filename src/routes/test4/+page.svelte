
<script >
    export let data;
  
    // The data will be received as a prop from the server
    console.log(data);
  </script>
  
  <main>


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

  {#if !(data && (data.binanceData || data.binanceFundingRateData || data.okexData))}
    <p>Loading...</p>
  {/if}



    {#if data && data.binanceData}
      <h1>Binance Data:</h1>
      <ul>
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
      </ul>
  
      
      <h1>Binance Funding Rate Data:</h1>
      <ul>
        {#each data.binanceFundingRateData as rate}
          <li>
            <strong>Symbol:</strong> {rate.symbol}, <strong>Funding Rate:</strong> {rate.fundingRate}, <strong>Funding Time:</strong> {rate.fundingTime}
          </li>
        {/each}
      </ul>
    {:else if data && data.okexData}
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
      <p>Loading...</p>
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



  </main>
  
  <style>
    /* Add any styling you need here */
  </style>
  