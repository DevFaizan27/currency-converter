import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);


  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      apikey: import.meta.env.VITE_API_KEY
    },
  };

  // Fetch currency data from an API using Axios
  useEffect(() => {
    axios
      .get('https://api.apilayer.com/currency_data/list', requestOptions)
      .then((response) => {
        const currencyData = response.data.currencies;
        const currencyList = Object.keys(currencyData).map((currencyCode) => ({
          code: currencyCode,
          name: currencyData[currencyCode], // Use the country name directly
        }));
        setCurrencies(currencyList);
      })
      .catch((error) => {
        console.error('Error fetching currency data:', error);
      });
  }, []);

  // Function to perform currency conversion
  const convertCurrency = () => {
    axios
      .get(
        `https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
        requestOptions
      )
      .then((response) => {
        setConvertedAmount(response.data.result.toFixed(2));
      })
      .catch((error) => {
        console.error('Error converting currency:', error);
      });
  };

  return (
    <div className=" m-auto mt-32 sm:mt-12 pt-5">
      <h1 className="text-3xl font-semibold">Currency Converter</h1>
      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium">
          Enter Amount:
        </label>
        <input
          type="number"
          id="amount"
          className="mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="fromCurrency" className="block text-sm font-medium">
          From Currency:
        </label>
        <select
          id="fromCurrency"
          className="mt-1 p-2 border border-gray-300 rounded-md"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="toCurrency" className="block text-sm font-medium">
          To Currency:
        </label>
        <select
          id="toCurrency"
          className="mt-1 p-2 border border-gray-300 rounded-md"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <button
          className="bg-emerald-300 text-gray-900 px-4 py-2 rounded-md"
          onClick={convertCurrency}
        >
          Convert
        </button>
      </div>
      <p className="mt-4 text-xl font-semibold">
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default Hero;
