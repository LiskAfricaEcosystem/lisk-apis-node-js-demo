require('dotenv').config();
const axios = require('axios');

// Configure Axios to use the Lisk Service API
const axiosInstance = axios.create({
  baseURL: process.env.LISK_SERVICE_URL || 'https://testnet-service.lisk.com/api/v3',
});

/**
 * Fetches a list of generators with optional search and pagination.
 * @param {Object} options - The filtering and pagination options.
 * @param {string} options.search - Text search in name, address, or publicKey.
 * @param {number} options.limit - Limit for the query results.
 * @param {number} options.offset - Offset for the query results.
 */
async function getGenerators({ search, limit = 10, offset = 0 } = {}) {
  try {
    // Constructing the query parameters string
    const queryParams = new URLSearchParams({
      ...(search && { search }),
      limit,
      offset,
    }).toString();

    const response = await axiosInstance.get(`/generators?${queryParams}`);
    console.log('Generators:', response.data);
  } catch (error) {
    console.error('Error fetching generators:', error.message);
  }
}

async function getBlocks() {
  try {
    const response = await axiosInstance.get('/blocks');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching blocks:', error.message);
  }
}

async function getTransactionById(transactionId) {
  try {
    const response = await axiosInstance.get(`/transactions?transactionID=${transactionId}`);
    console.log(response.data);
  } catch (error) {
    console.log(error)
    console.error(`Error fetching transaction ${transactionId}:`, error.message);
  }
}

async function checkAccountExists(address, tokenID = '0200000000000000') { // Assuming 'lsk' as the default token ID
  try {
    const response = await axiosInstance.get(`/token/account/exists?address=${address}&tokenID=${tokenID}`);
    console.log(response.data);
  } catch (error) {
    console.log(error)
    console.error(`Error checking account ${address} for tokenID ${tokenID}:`, error.message);
  }
}

/**
 * Fetches token balances for a specified Lisk account address.
 * 
 * @param {string} address The Lisk account address.
 * @param {string} [tokenID=''] Optional token ID to query a specific token's balance.
 * @param {number} [limit=10] The limit of results to return.
 * @param {number} [offset=0] The offset for the query results.
 */

// To query a specific token's balance, replace 'your_token_id' with an actual token ID
// getTokenBalances('lskdwsyfmcko6mcd357446yatromr9vzgu7eb8y99', 'your_token_id');

// To use pagination, specify the limit and offset as additional arguments
// getTokenBalances('lskdwsyfmcko6mcd357446yatromr9vzgu7eb8y99', '', 20, 10);
async function getTokenBalances(address, tokenID = '', limit = 10, offset = 0) {
  try {
    // Constructing the query parameters string
    let queryParams = `address=${address}`;
    if (tokenID) queryParams += `&tokenID=${tokenID}`;
    queryParams += `&limit=${limit}&offset=${offset}`;

    const response = await axiosInstance.get(`/token/balances?${queryParams}`);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching token balances for address ${address}:`, error.message);
  }
}

async function getTokenModuleConstants() {
  try {
    const response = await axiosInstance.get('/token/constants');
    console.log('Token Module Constants:', response.data);
  } catch (error) {
    console.error('Error fetching token module constants:', error.message);
  }
}

/**
 * Fetches a list of blockchain applications with optional filtering.
 * @param {Object} options - The filtering options.
 * @param {string} options.chainID - Chain ID to query (CSV format supported).
 * @param {string} options.chainName - Chain name to query (case-insensitive).
 * @param {string} options.status - Application status (CSV format supported).
 * @param {string} options.search - Text search in chain name (case-insensitive).
 * @param {number} options.limit - Limit for the query results.
 * @param {number} options.offset - Offset for the query results.
 */
async function getBlockchainApps({ chainID, chainName, status, search, limit = 10, offset = 0 } = {}) {
  try {
    // Constructing the query parameters string
    const queryParams = new URLSearchParams({
      ...(chainID && { chainID }),
      ...(chainName && { chainName }),
      ...(status && { status }),
      ...(search && { search }),
      limit,
      offset,
    }).toString();

    const response = await axiosInstance.get(`/blockchain/apps?${queryParams}`);
    console.log('Blockchain Applications:', response.data);
  } catch (error) {
    console.error('Error fetching blockchain applications:', error.message);
  }
}

/**
 * Fetches market prices.
 */
async function getMarketPrices() {
  try {
    const response = await axiosInstance.get('/market/prices');
    console.log('Market Prices:', response.data);
  } catch (error) {
    console.error('Error fetching market prices:', error.message);
  }
}

// Example usage
getGenerators({search: 'genesis_84', limit: 5,});
// getBlocks();
// Replace 'your_transaction_id' with an actual transaction ID
// getTransactionById('533fdf2261c0bcf84c175f15b528aee31bef206f68a2d33913a0f398e01df04a'); // fb02af07c125af35ae43e773d3ab25ce1b3f94311c5d8388fbfffd6bfb98fe88
// checkAccountExists('lsk55e8u4heymzmxgcrg4dc5xpgd5ckkyv53oxftb', '0200000000000000');
// getTokenBalances('lskdwsyfmcko6mcd357446yatromr9vzgu7eb8y99', '0200000000000000');
// getTokenModuleConstants();
// getBlockchainApps({ status: 'activated', limit: 5,});
// getMarketPrices();
