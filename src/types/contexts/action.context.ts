export interface ActionContextInterface {
    action: string
    transactions: {id: number, caller: string, to: string, value: string, timestamp: Date, status: number, vote: number}[]
    getTransactions: () => {}
    submitTransaction: (to: string, value: number) => {}
}

export interface ActionProviderInterface {
    children: JSX.Element
};

export type ActionType = {
    [key: string]: {
        test?: string,
    }
};