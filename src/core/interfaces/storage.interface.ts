export interface IStorageConfig {
  local: ILocalStorageConfig,
  s3: IAWSS3Config;
}

export interface IAWSS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

export interface ILocalStorageConfig {
  root: string;
}