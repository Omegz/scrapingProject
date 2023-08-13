import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const binanceUrl = 'https://fapi.binance.com/fapi/v1/premiumIndex?';
  const binanceFundingRateUrl = 'https://fapi.binance.com/fapi/v1/fundingRate?';
  const okexBaseUrl = 'https://www.okx.com/api/v5/public';
  
  // List of instrument IDs for swaps
  const instIds = [
    
    'BTC-USD-SWAP',
    'ETH-USD-SWAP',
    'SOL-USD-SWAP',
    'ADA-USD-SWAP',
    'DOT-USD-SWAP',
    'XRP-USD-SWAP',
    'LTC-USD-SWAP',
    'BCH-USD-SWAP',
    'UNI-USD-SWAP',
    'LINK-USD-SWAP',
    // Add more swaps as needed
  ];


  try {
    // Fetch data from the Binance API
    const responseBinance = await fetch(binanceUrl);
    if (!responseBinance.ok) {
      throw new Error('Binance API request failed');
    }
    const dataBinance = await responseBinance.json();

    // Fetch data from the Binance Funding Rate API
    const responseBinanceFundingRate = await fetch(binanceFundingRateUrl);
    if (!responseBinanceFundingRate.ok) {
      throw new Error('Binance Funding Rate API request failed');
    }
    const dataBinanceFundingRate = await responseBinanceFundingRate.json();

    // Fetch funding rate data for each instrument ID from the Okex API
    const okexFundingRateDataPromises = instIds.map(async (instId) => {
      const okexFundingRateUrl = `${okexBaseUrl}/funding-rate?instId=${instId}`;
      const responseOkexFundingRate = await fetch(okexFundingRateUrl);
      if (!responseOkexFundingRate.ok) {
        throw new Error(`Okex Funding Rate API request failed for ${instId}`);
      }
      const dataOkexFundingRate = await responseOkexFundingRate.json();
      return {
        instId: dataOkexFundingRate.data[0].instId,
        instType: dataOkexFundingRate.data[0].instType,
        fundingRate: dataOkexFundingRate.data[0].fundingRate,
        nextFundingRate: dataOkexFundingRate.data[0].nextFundingRate,
        fundingTime: new Date(parseInt(dataOkexFundingRate.data[0].fundingTime)).toLocaleString(),
        nextFundingTime: new Date(parseInt(dataOkexFundingRate.data[0].nextFundingTime)).toLocaleString(),
      };
    });

    // Wait for all Okex funding rate data to be fetched
    const okexFundingRateData = await Promise.all(okexFundingRateDataPromises);

    // Process the fetched data from Binance and extract relevant information
    const processedData = {
      binanceData: dataBinance.map((item: any) => ({
        symbol: item.symbol,
        markPrice: item.markPrice,
        indexPrice: item.indexPrice,
        estimatedSettlePrice: item.estimatedSettlePrice,
        lastFundingRate: item.lastFundingRate,
        nextFundingTime: new Date(item.nextFundingTime).toLocaleString(),
        interestRate: item.interestRate,
        time: new Date(item.time).toLocaleString(),
      })),
      binanceFundingRateData: dataBinanceFundingRate.map((item: any) => ({
        symbol: item.symbol,
        fundingRate: item.fundingRate,
        fundingTime: new Date(item.fundingTime).toLocaleString(),
      })),
      okexFundingRateData,
    };

    return processedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: [] };
  }
};
