export type Order = 'asc' | 'desc';

export type HeadCell = {
  id: string;
  label: string;
};

export type RowData = {
  pictureUrl: string;
  name: string;
  id: string;
  lang: string;
  version: string;
  keywords: string[];
  factionKeywords: string[];
  creationDate: Date;
  lastUpdateDate: Date;
};
