export type Order = 'asc' | 'desc';

export type HeadCell = {
  id: string;
  label: string;
  numeric: boolean;
};

export type RowData = {
  name: string;
  id: string;
  lang: string;
  version: string;
  keywords: string[];
  factionKeywords: string[];
};
