export interface ActionContextInterface {
  action: string;
  transaction: TransactionInterface[]
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
  id: string;
  caller: string;
  to: string;
  value: string;
  timestamp: string;
  status: number;
  vote: number;
}
