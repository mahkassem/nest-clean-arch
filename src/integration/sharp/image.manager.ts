import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { getFileExtension } from 'src/core/helpers/file.helper';


@Injectable()
export class ImageManager {
  async resize(file: Partial<Express.Multer.File>, meta?: ResizeImageOptions): Promise<Buffer> {
    try {
      const image = sharp(file.buffer)
        .resize(meta.size.width, meta.size.height, { ...meta.options });

      let format: ImageFormat;

      switch (getFileExtension(file)) {
        case 'jpg':
          format = 'jpg';
          break;
        case 'jpeg':
          format = 'jpeg';
          break;
        case 'png':
          format = 'png';
          break;
        default:
          format = meta.imageOptions.type;
          break;
      }

      image.toFormat(format, { quality: meta.imageOptions?.quality || 100 });

      return await image.toBuffer();
    } catch (error) {
      throw error.message;
    }
  }
}

export interface ResizeImageOptions {
  size: { width?: number, height?: number };
  options: sharp.ResizeOptions;
  imageOptions?: {
    quality?: number;
    type?: ImageFormat;
  }
}
