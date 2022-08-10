export interface ActionContextInterface {
  treasuryBalance: number;
  transactions: TransactionInterface[];
  getTransactions: () => {};
  submitTransaction: (to: string, value: number) => {};
  voteConfirmTransaction: (txnId: number) => {};
  voteNotConfirmTransaction: (txnId: number) => {};
  cancelTransaction: (txnId: number) => {};
  executeTransaction: (txnId: number) => {};
  currentFilter: string;
  updateFilter: (filter: string) => void;
  searchAddress: string;
  search: (address: string) => void;
}

export interface ActionProviderInterface {
  children: JSX.Element;
}

export interface TransactionInterface {
  id: number;
  caller: string;
  to: string;
  value: string;
  timestamp: string;
  status: string;
  vote: number;
  isVoted: boolean;
}
