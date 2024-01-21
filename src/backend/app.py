from flask import Flask, jsonify
import ccxt
import pandas as pd

import numpy as np  # Ensure NumPy is imported


app = Flask(__name__)

# CORS is needed if your frontend is on a different domain
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Fetching rates function
def fetch_funding_rates():
    exchanges = [ccxt.phemex(), ccxt.okx(), ccxt.bybit()]
    funding_rates_data = []

    for exchange in exchanges:
        exchange.load_markets()
        for symbol in exchange.symbols:
            if hasattr(exchange, 'fetchFundingRate'):
                try:
                    funding_rate = exchange.fetchFundingRate(symbol)
                    if funding_rate:
                        formatted_symbol = symbol.replace('/', '')
                        funding_rate['exchange'] = exchange.name
                        funding_rate['symbol'] = formatted_symbol
                        funding_rates_data.append(funding_rate)
                except Exception as e:
                    print(f'Error fetching funding rate for {symbol} on {exchange.name}: {str(e)}')
    return funding_rates_data

# API route to get crypto data
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/crypto-data')


def get_crypto_data():
    try:
        funding_rates_data = fetch_funding_rates()
        df = pd.DataFrame(funding_rates_data)
        # Extracting data from 'info' column
        info_df = df['info'].apply(pd.Series)
        df_combined = pd.concat([df.drop(columns=['info']), info_df], axis=1)
        # Fetch data from the Binance API
        response_binance = requests.get(binance_url)
        response_binance.raise_for_status()
        data_binance = response_binance.json()
        # print(data_binance)
        # {
        #  'symbol': 'AVAXUSDT',
        #  'markPrice': '10.95922001',
        #  'indexPrice': '10.95263645',
        #  'estimatedSettlePrice': '10.93479216',
        #  'lastFundingRate': '0.00010000',
        #  'interestRate': '0.00010000',
        #  'nextFundingTime': 1698595200000,
        #  'time': 1698583846000
        # }

        # Replace NaN with None in each record
        records = df_combined.to_dict(orient='records')
        for record in records:
            for key, value in record.items():
                if isinstance(value, float) and np.isnan(value):
                    record[key] = None

        return jsonify(records)
    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"error": "Internal server error"}), 500
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

        # print(okex_funding_rate_data)
        # {
        #  'instId': 'SOL-USD-SWAP',
        #  'instType': 'SWAP',
        #  'fundingRate': '0.0000348427862751',
        #  'nextFundingRate': '0.0000111639945068',
        #  'fundingTime': '1698595200000',
        #  'nextFundingTime': '1698624000000'
        # }

        # Process the fetched data and prepare a response
        processed_data = {
            # Tables
            "Coin Table 1": {
                # Columns - Subrows
                'Symbol': [list(map(lambda x: x['symbol'], data_binance)), ],
                'Binance Data': [
                    list(map(lambda x: x['lastFundingRate'], data_binance)),
                    list(map(lambda x: x['nextFundingTime'], data_binance)),
                    list(map(lambda x: x['indexPrice'], data_binance)),
                    list(map(lambda x: x['interestRate'], data_binance))
                ],

                'OKEX Data': [
                    list(map(lambda x: x['fundingRate'],
                         okex_funding_rate_data)),
                    list(map(lambda x: x['nextFundingRate'],
                             okex_funding_rate_data)),
                    list(map(lambda x: x['nextFundingTime'],
                             okex_funding_rate_data))
                ]
            },
        }

        return jsonify(processed_data)
    except requests.exceptions.RequestException as e:
        print('Error fetching data:', e)
        return jsonify({'error': 'Failed to fetch data'}), 500


if __name__ == '__main__':
    app.run(debug=True)
