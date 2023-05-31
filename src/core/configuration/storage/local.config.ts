import { readEnv } from "src/core/helpers/env.helper";
import { ILocalStorageConfig } from "src/core/interfaces/storage.interface";

export default () => ({
  root: readEnv('LOCAL_STORAGE_PATH')
}) as ILocalStorageConfig;