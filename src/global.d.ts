import { User } from "./infrastructure/entities/user/user.entity";

// declare some global types ES6
export { }

declare global {
  type TEnv = 'string' | 'number' | 'boolean';
  type TEnvValue = string | number | boolean;
  type ImageFormat = 'jpeg' | 'jpg' | 'png' | 'webp' | 'tiff' | 'raw' | 'gif' | 'svg';
}

declare module 'express-serve-static-core' {
  export interface Request {
    user: User
  }
}