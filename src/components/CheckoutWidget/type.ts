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

export const envs = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
} as const;

export type EnvType = typeof envs[keyof typeof envs];

export type ComponentProps = {
  collectionId: string;
  libraryType?: LibraryType;
  view?: ViewType;
  env?: EnvType;
};
