import axios from "axios";
import crypto from "crypto";

const createSignature = (params, apiSecret) => {
  return crypto.createHmac("sha256", apiSecret).update(params).digest("hex");
};

const getBaseUrl = (test, type = "spot") => {
  switch (type) {
    case "spot":
      return test
        ? "https://testnet.binance.vision"
        : "https://api.binance.com";
    case "usdm":
      return test
        ? "https://testnet.binancefuture.com"
        : "https://fapi.binance.com";
    case "coinm":
      return test
        ? "https://testnet.binancefuture.com"
        : "https://dapi.binance.com";
    default:
      throw new Error("Invalid type");
  }
};

export const placeOrder = async (
  account,
  symbol,
  side,
  // type,
  quantity,
  price
) => {
  const apiKey = account.apiKey;
  const apiSecret = account.apiSecret || account.apiSecretKey;
  const test = account.test;

  let type = "MARKET";
  if (!apiKey || !apiSecret) return { error: "Invalid API Keys" };

  let baseURL = getBaseUrl(test);

  const timestamp = Date.now();
  let params = `symbol=${symbol}&side=${side.toUpperCase()}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;

  if (type === "LIMIT") {
    params += `&price=${price}&timeInForce=GTC`;
  }

  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}/api/v3/order?${params}&signature=${signature}`;

  try {
    const response = await axios.post(url, null, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Failed to place test order for symbol ${symbol}`,
      error.response.data
    );

    return {
      errorMessage: `Failed to place test order for symbol ${symbol}`,
      error: error.response.data,
    };
  }
};

export const getSpotAccountInfo = async (account) => {
  const apiKey = account.apiKey;
  const apiSecret = account.apiSecret || account.apiSecretKey;
  const test = account.test;

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);

  const baseURL = getBaseUrl(test);
  const url = `${baseURL}/api/v3/account?${params}&signature=${signature}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch spot account info ...");
    return { error: "An issue has occurred fetching spot account info!" };
  }
};

export const getUsdMFuturesAccountInfo = async (account) => {
  const apiKey = account.apiKey;
  const apiSecret = account.apiSecret || account.apiSecretKey;
  const test = account.test;

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);

  const baseURL = getBaseUrl(test, "usdm");
  const url = `${baseURL}/fapi/v2/account?${params}&signature=${signature}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch UsdM futures account info ...");
    return {
      error: "An issue has occurred fetching UsdM futures account info!",
    };
  }
};

export const getCoinMFuturesAccountInfo = async (account) => {
  const apiKey = account.apiKey;
  const apiSecret = account.apiSecret || account.apiSecretKey;
  const test = account.test;

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);

  const baseURL = getBaseUrl(test, "coinm");
  const url = `${baseURL}/dapi/v1/account?${params}&signature=${signature}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch CoinM account info ...");
    return { error: "An issue has occurred fetching CoinM account info!" };
  }
};

export const getAccountInfo = async (account) => {
  const apiKey = account.apiKey;
  const apiSecret = account.apiSecret || account.apiSecretKey;
  const test = account.test;

  if (!apiKey || !apiSecret) return { error: "Invalid API Keys" };

  try {
    const [spotInfo, usdMInfo, coinMInfo] = await Promise.all([
      getSpotAccountInfo({ apiKey, apiSecret, test }),
      getUsdMFuturesAccountInfo({ apiKey, apiSecret, test }),
      getCoinMFuturesAccountInfo({ apiKey, apiSecret, test }),
    ]);

    // if (spotInfo.error || usdMInfo.error) {
    //   return { error: "Failed to fetch account information" };
    // }

    return {
      spotInfo: spotInfo,
      usdMInfo: usdMInfo,
      coinMInfo: coinMInfo,
    };
  } catch (error) {
    console.error("Failed to fetch account info ...");
    return { error: "An issue has occurred!" };
  }
};

export const validateCredentials = async (account) => {
  const apiKey = account.apiKey;
  const apiSecret = account.apiSecret || account.apiSecretKey;
  const test = account.test;

  if (!apiKey || !apiSecret) return { error: "Invalid API Keys" };

  try {
    const baseURL = getBaseUrl(test);
    const url = baseURL + `/api/v3/userDataStream`;

    const response = await axios.post(url, null, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });

    const isValid = response.status === 200;
    const listenKey = response.data.listenKey;
    console.log(
      "----------------------------------------------------------------"
    );
    console.log(test, listenKey);
    console.log(
      "----------------------------------------------------------------"
    );

    if (isValid) {
      return { valid: true, listenKey };
    } else {
      return { valid: false, listenKey };
    }
  } catch (error) {
    return { valid: false, error: "Failed to authenticate", err: error };
  }
};

export const getPrice = async (symbol) => {
  try {
    const baseURL = "https://api.binance.com";
    const response = await axios.get(
      `${baseURL}/api/v3/ticker/price?symbol=${symbol}`
    );
    return parseFloat(response.data.price);
  } catch (error) {
    console.error(`Failed to fetch price for symbol ${symbol}`);
    return null;
  }
};

// Fetch trade history for spot account
const fetchSpotTradeHistory = async (account) => {
  const { apiKey, apiSecret, test } = account;
  const baseURL = getBaseUrl("spot", test);
  const endpoint = "/api/v3/myTrades";

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}${endpoint}?${params}&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": apiKey };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch spot trade history", error);
    throw error;
  }
};

// Fetch trade history for USDM account
const fetchUsdmTradeHistory = async (account) => {
  const { apiKey, apiSecret, test } = account;
  const baseURL = getBaseUrl("usdm", test);
  const endpoint = "/fapi/v1/userTrades";

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}${endpoint}?${params}&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": apiKey };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch USDM trade history", error);
    throw error;
  }
};

// Fetch trade history for COINM account
const fetchCoinmTradeHistory = async (account) => {
  const { apiKey, apiSecret, test } = account;
  const baseURL = getBaseUrl("coinm", test);
  const endpoint = "/dapi/v1/userTrades";

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}${endpoint}?${params}&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": apiKey };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch COINM trade history", error);
    throw error;
  }
};

// Main function to fetch all trade history
const fetchAllTradeHistory = async (account) => {
  try {
    const [spotTrades, usdmTrades, coinmTrades] = await Promise.all([
      fetchSpotTradeHistory(account),
      fetchUsdmTradeHistory(account),
      fetchCoinmTradeHistory(account),
    ]);

    return {
      spotTrades,
      usdmTrades,
      coinmTrades,
    };
  } catch (error) {
    console.error("Failed to fetch all trade history", error);
    throw error;
  }
};

// Fetch open orders for spot account
const fetchSpotOpenOrders = async (account) => {
  const { apiKey, apiSecret, test } = account;
  const baseURL = getBaseUrl(test, "spot");
  const endpoint = "/api/v3/openOrders";

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}${endpoint}?${params}&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": apiKey };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch spot open orders", error);
    throw error;
  }
};

// Fetch open orders for USDM account
const fetchUsdmOpenOrders = async (account) => {
  const { apiKey, apiSecret, test } = account;
  const baseURL = getBaseUrl(test, "usdm");
  const endpoint = "/fapi/v1/openOrders";

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}${endpoint}?${params}&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": apiKey };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch USDM open orders", error);
    throw error;
  }
};

// Fetch open orders for COINM account
const fetchCoinmOpenOrders = async (account) => {
  const { apiKey, apiSecret, test } = account;
  const baseURL = getBaseUrl(test, "coinm");
  const endpoint = "/dapi/v1/openOrders";

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = createSignature(params, apiSecret);
  const url = `${baseURL}${endpoint}?${params}&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": apiKey };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch COINM open orders", error);
    throw error;
  }
};

// Main function to fetch all open orders
export const fetchAllOpenOrders = async (account) => {
  // console.log(account);
  try {
    const [spotOrders, usdmOrders, coinmOrders] = await Promise.all([
      fetchSpotOpenOrders(account),
      fetchUsdmOpenOrders(account),
      fetchCoinmOpenOrders(account),
    ]);

    return {
      spotOrders,
      usdmOrders,
      coinmOrders,
    };
  } catch (error) {
    console.error("Failed to fetch all open orders", error);
    throw error;
  }
};
