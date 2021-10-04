export type Order = 'asc' | 'desc';

export type HeadCell = {
  id: string;
  label: string;
};

export type RowData = {
  displayName: string;
  id: string;
  email: string;
  role: string;
  disabled: boolean;
};
