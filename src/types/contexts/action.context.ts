export interface ActionContextInterface {
    action: string
}

export interface ActionProviderInterface {
    children: JSX.Element
};

export type ActionType = {
    [key: string]: {
        test?: string,
    }
};