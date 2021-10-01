export type Order = 'asc' | 'desc';

export type HeadCell = {
  id: string;
  label: string;
};

export type RowData = {
  name: string;
  id: string;
  email: string;
  role: string;
  creationDate: Date;
  lastUpdateDate: Date;
};
