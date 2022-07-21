export interface ActionContextInterface {
  treasuryBalance: number;
  transaction: TransactionInterface[];
  getTransactions: () => {};
  submitTransaction: (to: string, value: number) => {};
  voteConfirmTransaction: (txnId: number) => {};
  voteNotConfirmTransaction: (txnId: number) => {};
  cancelTransaction: (txnId: number) => {};
  executeTransaction: (txnId: number) => {};
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
}
