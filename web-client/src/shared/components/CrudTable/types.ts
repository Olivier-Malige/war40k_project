export type Order = 'asc' | 'desc';

export enum RowCellsType {
  value,
  boolean,
  image,
  date,
}

export type TableCellConfig = {
  rowType: RowCellsType;
  id: string;
  label: string;
};

export type CrudTableTexts = {
  tableTitle: string;
  updateTitle: string;
  createTile: string;
  deleteRowElement: string;
};

export type UpsertFormProps = {
  onSubmit: () => void;
  id?: string;
};
