export const libraries = {
  WEB3: 'web3',
  ETHERS: 'ethers'
} as const;

export type LibraryType = typeof libraries[keyof typeof libraries];

export const views = {
  MINI: 'mini',
  NORMAL: 'normal'
} as const;

export type ViewType = typeof views[keyof typeof views];

export type ComponentProps = {
  collectionId: string;
  libraryType?: LibraryType;
  view?: ViewType;
};
