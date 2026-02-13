import { CategoryBlock, MenuRow, ScreenLayout } from './types';

export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const formatUnit = (unit: string): string => `/${(unit || 'lb').toLowerCase()}`;

const byCategoryAndSubcategory = (
  rows: MenuRow[],
  category: string,
  subcategory?: string
): MenuRow[] => {
  const targetCategory = category.toLowerCase();
  const targetSub = subcategory?.toLowerCase();

  return rows.filter((row) => {
    const categoryMatch = row.category.toLowerCase() === targetCategory;
    if (!categoryMatch) return false;
    if (!targetSub) return true;
    return (row.subcategory ?? '').toLowerCase() === targetSub;
  });
};

const byCategoryIncludes = (rows: MenuRow[], key: string): MenuRow[] => {
  const token = key.toLowerCase();
  return rows.filter((row) => row.category.toLowerCase().includes(token));
};

const createBlock = (
  title: string,
  rows: MenuRow[],
  subtitle?: string
): CategoryBlock => ({
  title,
  subtitle,
  rows
});

export const buildScreenOne = (rows: MenuRow[], lastUpdated: string): ScreenLayout => {
  const chickenRegular = byCategoryAndSubcategory(rows, 'Chicken', 'Regular');
  const chickenAbf = byCategoryAndSubcategory(rows, 'Chicken', 'ABF');
  const chickenMarinated = byCategoryAndSubcategory(rows, 'Chicken', 'Marinated');

  const deliBeef = byCategoryAndSubcategory(rows, 'Marination/Deli', 'Beef');
  const deliLamb = byCategoryAndSubcategory(rows, 'Marination/Deli', 'Lamb');
  const deliVeal = byCategoryAndSubcategory(rows, 'Marination/Deli', 'Veal');

  return {
    id: 1,
    lastUpdated,
    leftBlocks: [
      createBlock('Chicken', chickenRegular, 'Regular'),
      createBlock('Chicken', chickenAbf, 'ABF'),
      createBlock('Chicken', chickenMarinated, 'Marinated')
    ],
    rightBlocks: [
      createBlock('Marination / Deli', deliBeef, 'Beef'),
      createBlock('Marination / Deli', deliLamb, 'Lamb'),
      createBlock('Marination / Deli', deliVeal, 'Veal')
    ]
  };
};

export const buildScreenTwo = (rows: MenuRow[], lastUpdated: string): ScreenLayout => {
  return {
    id: 2,
    lastUpdated,
    leftBlocks: [
      createBlock('Beef', byCategoryAndSubcategory(rows, 'Beef')),
      createBlock('Veal', byCategoryAndSubcategory(rows, 'Veal')),
      createBlock('Steaks', byCategoryAndSubcategory(rows, 'Steaks'))
    ],
    rightBlocks: [
      createBlock('Goat', byCategoryAndSubcategory(rows, 'Goat')),
      createBlock('Baby Goat', byCategoryIncludes(rows, 'baby goat')),
      createBlock('Lamb', byCategoryAndSubcategory(rows, 'Lamb')),
      createBlock('Baby Lamb', byCategoryIncludes(rows, 'baby lamb'))
    ]
  };
};
