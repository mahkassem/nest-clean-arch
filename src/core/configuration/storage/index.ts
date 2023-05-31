import { IStorageConfig } from "src/core/interfaces/storage.interface";
import localConfig from "./local.config";
import s3Config from "./s3.config";

export default () => ({
  local: localConfig(),
  s3: s3Config()
}) as IStorageConfig;