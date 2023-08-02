// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async () => {
//   const binanceUrl = 'https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT&limit=1';
//   const okexUrl = 'https://www.okx.com/api/v5/public/funding-rate';
//   const instId = 'BTC-USD-SWAP'; // Instrument ID for Okex API (you may change it based on your requirements)

//   try {
//     // Fetch data from the Binance API
//     const responseBinance = await fetch(binanceUrl);
//     if (!responseBinance.ok) {
//       throw new Error('Binance API request failed');
//     }
//     const dataBinance = await responseBinance.json();

//     // Log the raw API response from Binance
//     console.log('Binance API Response:', dataBinance);

//     // Fetch data from the Okex API
//     const responseOkex = await fetch(`${okexUrl}?instId=${instId}`);
//     if (!responseOkex.ok) {
//       throw new Error('Okex API request failed');
//     }
//     const dataOkex = await responseOkex.json();

//     // Log the raw API response from Okex
//     console.log('Okex API Response:', dataOkex);

//     // Process the fetched data from Binance and extract relevant information
//     const binanceData = {
//       symbol: dataBinance.symbol,
//       markPrice: dataBinance.markPrice,
//       indexPrice: dataBinance.indexPrice,
//       estimatedSettlePrice: dataBinance.estimatedSettlePrice,
//       lastFundingRate: dataBinance.lastFundingRate,
//       nextFundingTime: new Date(dataBinance.nextFundingTime).toLocaleString(),
//       interestRate: dataBinance.interestRate,
//       time: new Date(dataBinance.time).toLocaleString(),
//     };

//     // Process the fetched data from Okex and extract relevant information
//     const okexData = {
//       fundingRate: dataOkex.data[0].fundingRate,
//       fundingTime: new Date(parseInt(dataOkex.data[0].fundingTime)).toLocaleString(),
//       instId: dataOkex.data[0].instId,
//       instType: dataOkex.data[0].instType,
//       nextFundingRate: dataOkex.data[0].nextFundingRate,
//       nextFundingTime: new Date(parseInt(dataOkex.data[0].nextFundingTime)).toLocaleString(),
//     };

//     // Return the processed data from both APIs
//     return {
//       binanceData,
//       okexData,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return { status: [] };
//   }
// };


import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
//   const binanceUrl = 'https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT&limit=1';
//   const binanceFundingRateUrl = 'https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=2';
const binanceUrl = 'https://fapi.binance.com/fapi/v1/premiumIndex?';
const binanceFundingRateUrl = 'https://fapi.binance.com/fapi/v1/fundingRate?';
  const okexUrl = 'https://www.okx.com/api/v5/public/funding-rate';
  const instId = 'SOL-USD-SWAP'; // Instrument ID for Okex API (you may change it based on your requirements)

  try {
    // Fetch data from the Binance API
    const responseBinance = await fetch(binanceUrl);
    if (!responseBinance.ok) {
      throw new Error('Binance API request failed');
    }
    const dataBinance = await responseBinance.json();

    // Log the raw API response from Binance
    console.log('Binance API Response:', dataBinance);

    // Fetch data from the Binance Funding Rate API
    const responseBinanceFundingRate = await fetch(binanceFundingRateUrl);
    if (!responseBinanceFundingRate.ok) {
      throw new Error('Binance Funding Rate API request failed');
    }
    const dataBinanceFundingRate = await responseBinanceFundingRate.json();

    // Log the raw API response from the Binance Funding Rate API
    console.log('Binance Funding Rate API Response:', dataBinanceFundingRate);

    // Process the fetched data from Binance and extract relevant information
    const { symbol, markPrice, indexPrice, estimatedSettlePrice, lastFundingRate, nextFundingTime, interestRate, time } = dataBinance;

    // Extract the relevant information from the Binance Funding Rate data
    const binanceFundingRateData = dataBinanceFundingRate.map((item: any) => ({
      symbol: item.symbol,
      fundingRate: item.fundingRate,
      fundingTime: new Date(item.fundingTime).toLocaleString(),
    }));

    const binanceData = dataBinance.map((item: any) => ({
        symbol: item.symbol,
        markPrice: item.markPrice,
        indexPrice: item.indexPrice,
        estimatedSettlePrice: item.estimatedSettlePrice,
        lastFundingRate: item.lastFundingRate,
        nextFundingTime: new Date(item.nextFundingTime).toLocaleString(),
        interestRate: item.interestRate,
        time: new Date(item.time).toLocaleString(),
      }));
    

    // Fetch data from the Okex API
    const responseOkex = await fetch(`${okexUrl}?instId=${instId}`);
    if (!responseOkex.ok) {
      throw new Error('Okex API request failed');
    }
    const dataOkex = await responseOkex.json();

    // Log the raw API response from Okex
    console.log('Okex API Response:', dataOkex);

    // Process the fetched data from Okex and extract relevant information
    const okexData = {
      fundingRate: dataOkex.data[0].fundingRate,
      fundingTime: new Date(parseInt(dataOkex.data[0].fundingTime)).toLocaleString(),
      instId: dataOkex.data[0].instId,
      instType: dataOkex.data[0].instType,
      nextFundingRate: dataOkex.data[0].nextFundingRate,
      nextFundingTime: new Date(parseInt(dataOkex.data[0].nextFundingTime)).toLocaleString(),
    };

    // Return the processed data from all APIs
    return {
    //   binanceData: {
    //     symbol,
    //     markPrice,
    //     indexPrice,
    //     estimatedSettlePrice,
    //     lastFundingRate,
    //     nextFundingTime: new Date(nextFundingTime).toLocaleString(),
    //     interestRate,
    //     time: new Date(time).toLocaleString(),
    //   },
    binanceData,
      binanceFundingRateData,
      okexData,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: [] };
  }
};
