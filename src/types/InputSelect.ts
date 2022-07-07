export type listOptionType = {
  value: string,
  label: string | JSX.Element
};
export interface InputSelectInterface {
  className?: string,
  listOption?: listOptionType[],
  selectionUpdate: string,
  defaultValue?: string,
  selectLabel: string
};