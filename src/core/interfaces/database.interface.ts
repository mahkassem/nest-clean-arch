import { ICacheConfig } from "./cache.interface";

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  autoLoadModels?: boolean;
  synchronize?: boolean;
  cache?: ICacheConfig;
  legacySpatialSupport?: boolean;
}