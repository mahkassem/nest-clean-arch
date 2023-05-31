import { readEnv } from "src/core/helpers/env.helper";
import { IAWSS3Config } from "src/core/interfaces/storage.interface";

export default () => ({
  accessKeyId: readEnv("AWS_ACCESS_KEY_ID"),
  secretAccessKey: readEnv("AWS_SECRET_ACCESS_KEY"),
  region: readEnv("AWS_REGION"),
  bucket: readEnv("AWS_BUCKET"),
}) as IAWSS3Config;