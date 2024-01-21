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

@app.route('/api/crypto-data')


def get_crypto_data():
    try:
        funding_rates_data = fetch_funding_rates()
        df = pd.DataFrame(funding_rates_data)
        # Extracting data from 'info' column
        info_df = df['info'].apply(pd.Series)
        df_combined = pd.concat([df.drop(columns=['info']), info_df], axis=1)

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

if __name__ == '__main__':
    app.run(debug=True)
