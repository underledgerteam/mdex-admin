import {
  SWAP_CONTRACTS_INTERFACE,
  TRANSACTION_STATUS_INTERFACE,
} from "../types/constants";
import multiSigWalletABI from "src/utils/MultiSigWalletABI.json";
import callTokenABI from "src/utils/CallToken.json";

export const SWAP_CONTRACTS: SWAP_CONTRACTS_INTERFACE = {
  // 4: {
  //   NETWORK_NAME: "Rinkeby Testnet Network",
  //   NETWORK_SHORT_NAME: "Rinkeby",
  //   SYMBOL: "chian/ethereum.png",
  //   CHAIN_NAME: "Ethereum",
  //   CURRENCY_SYMBOL: "ETH",
  //   ADDRESS: "",
  //   ABI: callTokenABI,
  // },
  5: {
    NETWORK_NAME: "Goerli Testnet Network",
    NETWORK_SHORT_NAME: "Goerli",
    SYMBOL: "chian/ethereum.png",
    CHAIN_NAME: "Ethereum",
    CURRENCY_SYMBOL: "ETH",
    ADDRESS: "",
    ABI: callTokenABI,
  },
  420: {
    NETWORK_NAME: "Optimism Goerli Testnet Network",
    NETWORK_SHORT_NAME: "Optimism Goerli",
    SYMBOL: "chian/ethereum.png",
    CHAIN_NAME: "Ethereum",
    CURRENCY_SYMBOL: "ETH",

    NATIVE_CURRENCY: {
      NAME: "Ethereum",
      SYMBOL: "ETH",
      DECIMALS: 18
    },
    RPC_URLS: ["https://opt-goerli.g.alchemy.com/v2/urWmxbQMmnpzgfaleRxohQrcRF8RnHkf"],
    BLOCK_EXPLORER_URLS: ["https://blockscout.com/optimism/goerli"],

    ADDRESS: "",
    ABI: callTokenABI,
  },
  // 421611: {
  //   NETWORK_NAME: "Arbitrum Testnet",
  //   NETWORK_SHORT_NAME: "Arbitrum",
  //   SYMBOL: "chian/arbitrum.svg",
  //   CHAIN_NAME: "Ethereum",
  //   CURRENCY_SYMBOL: "ETH",

  //   NATIVE_CURRENCY: {
  //     NAME: "Avalanche",
  //     SYMBOL: "ARETH",
  //     DECIMALS: 18,
  //   },
  //   RPC_URLS: ["https://rinkeby.arbitrum.io/rpc"],
  //   BLOCK_EXPLORER_URLS: ["https://rinkeby-explorer.arbitrum.io/#/"],

  //   ADDRESS: "",
  //   ABI: callTokenABI,
  // },
  // 43113: {
  //   NETWORK_NAME: "AVAX Testnet Network",
  //   NETWORK_SHORT_NAME: "Avalanche",
  //   SYMBOL: "chian/avalanche.png",
  //   CHAIN_NAME: "Avalanche",
  //   CURRENCY_SYMBOL: "AVAX",

  //   NATIVE_CURRENCY: {
  //     NAME: "Avalanche",
  //     SYMBOL: "AVAX",
  //     DECIMALS: 18,
  //   },
  //   RPC_URLS: ["https://api.avax-test.network/ext/bc/C/rpc"],
  //   BLOCK_EXPLORER_URLS: ["https://testnet.snowtrace.io/"],

  //   ADDRESS: "",
  //   ABI: callTokenABI,
  // },
  // 80001: {
  //   NETWORK_NAME: "Polygon Testnet Network",
  //   NETWORK_SHORT_NAME: "Polygon",
  //   SYMBOL: "chian/polygon.png",
  //   CHAIN_NAME: "Polygon",
  //   CURRENCY_SYMBOL: "MATIC",

  //   NATIVE_CURRENCY: {
  //     NAME: "MATIC Token",
  //     SYMBOL: "MATIC",
  //     DECIMALS: 18,
  //   },
  //   RPC_URLS: ["https://matic-mumbai.chainstacklabs.com/"],
  //   BLOCK_EXPLORER_URLS: ["https://mumbai.polygonscan.com/"],

  //   ADDRESS: "",
  //   ABI: callTokenABI,
  // },
  // 97: {
  //   NETWORK_NAME: "Binance Smart Chain Testnet",
  //   NETWORK_SHORT_NAME: "BSC",
  //   SYMBOL: "chian/binance.png",
  //   CHAIN_NAME: "Binance",
  //   CURRENCY_SYMBOL: "BNB",

  //   NATIVE_CURRENCY: {
  //     NAME: "Binance Coin",
  //     SYMBOL: "BNB",
  //     DECIMALS: 18,
  //   },
  //   RPC_URLS: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  //   BLOCK_EXPLORER_URLS: ["https://explorer.binance.org/smart-testnet"],

  //   ADDRESS: "",
  //   ABI: callTokenABI,
  // },
};

export const ROPSTEN: number = 3;
export const RINKEBY: number = 4;
export const GOERLI: number = 5;
export const OPTIMISM_GOERLI: number = 420;
export const KOVAN: number = 42;
export const BSC_CHAPEL: number = 97;
export const POLYGON_MUMBAI: number = 80001;
export const ARBITRUM_RINKEBY: number = 421611;
export const AVALANCHE_FUJI: number = 43113;

export const SUPPORT_CHAIN: number[] = [
  // RINKEBY,
  GOERLI,
  OPTIMISM_GOERLI,
  // BSC_CHAPEL,
  // POLYGON_MUMBAI,
  // ARBITRUM_RINKEBY,
  // AVALANCHE_FUJI,
];

export const ADMIN_WALLET: string[] = [
  "0x586f45ef74679373efafcef08f7035fb699f40dd".toLowerCase(), // Jo
  "0xE507a517934d0F88663D242A580B5aC548a63786".toLowerCase(), // Golf
  "0x23abB459fC3Ae05B52f482aBB2D2D9D7C9e33D28".toLowerCase(), // Mob
  "0xe9D2e454968379426BB6b0a92ffaf20A60ff579d".toLowerCase(), // Prame
  "0xa9aAB3581a3986E38E84643793FCe205677bd19d".toLowerCase(), // Aon
  "0x2BA9a6C68D39EFEc15C2c048124B4f6dAac5d6fd".toLowerCase(), // Tang
  "0x56E1175b24B440C57EA6677a50bfF4bc461FF60f".toLowerCase(), // Jab
];

export const DEFAULT_CHAIN: number = GOERLI;

export const MULTI_SIG_WALLET_CONTRACTS: SWAP_CONTRACTS_INTERFACE = {
  // 4: {
  //   NETWORK_NAME: "Rinkeby Testnet Network",
  //   NETWORK_SHORT_NAME: "Rinkeby",
  //   SYMBOL: "chian/ethereum.png",
  //   CHAIN_NAME: "Ethereum",
  //   CURRENCY_SYMBOL: "ETH",
  //   ADDRESS: "0x33DcB383153bD106931911A4D81ac0DA719412B4",
  //   ABI: multiSigWalletABI,
  //   BLOCK_EXPLORER_URLS: ["https://rinkeby.etherscan.io/"],
  // },
  420: {
    NETWORK_NAME: "Optimism Goerli Testnet Network",
    NETWORK_SHORT_NAME: "Optimism Goerli",
    SYMBOL: "chian/ethereum.png",
    CHAIN_NAME: "Ethereum",
    CURRENCY_SYMBOL: "ETH",
    ADDRESS: "0xB2468b3CF340D748774bb0139F835b1cFDA86F40",
    ABI: multiSigWalletABI,
    BLOCK_EXPLORER_URLS: ["https://blockscout.com/optimism/goerli"],
  },
  5: {
    NETWORK_NAME: "Goerli Testnet Network",
    NETWORK_SHORT_NAME: "Goerli",
    SYMBOL: "chian/ethereum.png",
    CHAIN_NAME: "Ethereum",
    CURRENCY_SYMBOL: "ETH",
    ADDRESS: "0x0b88D6D0c00a4399FA73B903E627Ec16e926eC53",
    ABI: multiSigWalletABI,
    BLOCK_EXPLORER_URLS: ["https://goerli.etherscan.io/"],
  },
};

export const MULTI_SIG_DECIMAL_SET: number = 2;

export const TRANSACTION_STATUS: TRANSACTION_STATUS_INTERFACE = {
  0: "WAITING", // approver see Yes,No
  1: "READY", // owner see Execute
  2: "QUEUE", // everyone see Cancel
  3: "FAILED",
  4: "SUCCESS",
};

export const GAS_LIMIT: number = 2100000;
