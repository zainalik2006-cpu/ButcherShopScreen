export type MenuRow = {
  category: string;
  subcategory?: string;
  item: string;
  unit: string;
  price: number;
  visible: boolean;
  order: number;
};

export type CategoryBlock = {
  title: string;
  subtitle?: string;
  rows: MenuRow[];
};

export type ScreenLayout = {
  id: 1 | 2;
  lastUpdated: string;
  leftBlocks: CategoryBlock[];
  rightBlocks: CategoryBlock[];
};
