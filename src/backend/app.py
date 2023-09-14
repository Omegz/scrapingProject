from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

@app.route('/api/crypto-data')
def get_crypto_data():
    binance_url = 'https://fapi.binance.com/fapi/v1/premiumIndex?'
    binance_funding_rate_url = 'https://fapi.binance.com/fapi/v1/fundingRate?'
    okex_base_url = 'https://www.okx.com/api/v5/public'
    
    inst_ids = [
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
        # Add more swaps as needed
    ]

    try:
        # Fetch data from the Binance API
        response_binance = requests.get(binance_url)
        response_binance.raise_for_status()
        data_binance = response_binance.json()

        # Fetch data from the Binance Funding Rate API
        response_binance_funding_rate = requests.get(binance_funding_rate_url)
        response_binance_funding_rate.raise_for_status()
        data_binance_funding_rate = response_binance_funding_rate.json()

        # Fetch funding rate data for each instrument ID from the Okex API
        okex_funding_rate_data = []
        for inst_id in inst_ids:
            okex_funding_rate_url = f"{okex_base_url}/funding-rate?instId={inst_id}"
            response_okex_funding_rate = requests.get(okex_funding_rate_url)
            response_okex_funding_rate.raise_for_status()
            data_okex_funding_rate = response_okex_funding_rate.json()
            
            okex_funding_rate_data.append({
                "instId": data_okex_funding_rate["data"][0]["instId"],
                "instType": data_okex_funding_rate["data"][0]["instType"],
                "fundingRate": data_okex_funding_rate["data"][0]["fundingRate"],
                "nextFundingRate": data_okex_funding_rate["data"][0]["nextFundingRate"],
                "fundingTime": data_okex_funding_rate["data"][0]["fundingTime"],
                "nextFundingTime": data_okex_funding_rate["data"][0]["nextFundingTime"],
            })

        # Process the fetched data and prepare a response
        processed_data = {
            "binanceData": data_binance,
            "binanceFundingRateData": data_binance_funding_rate,
            "okexFundingRateData": okex_funding_rate_data
        }

        return jsonify(processed_data)
    except requests.exceptions.RequestException as e:
        print('Error fetching data:', e)
        return jsonify({'error': 'Failed to fetch data'}), 500

if __name__ == '__main__':
    app.run(debug=True) 