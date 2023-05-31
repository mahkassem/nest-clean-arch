import { Inject, Injectable } from '@nestjs/common';
import { DriverType, StorageService } from '@codebrew/nestjs-storage';
import { ConfigService } from '@nestjs/config';
import { getFileExtension, getFileName } from 'src/core/helpers/file.helper';

@Injectable()
export class StorageManager {
  static storage: StorageService;

  constructor(
    @Inject(StorageService) private storage: StorageService,
    private config: ConfigService,
  ) {
    this.storage = storage;
  }

  getUrl(path: string, disk = DriverType.LOCAL): string {
    try {
      return this.storage.getDisk(disk).getUrl(path);
    } catch (error) {
      throw error.message;
    }
  }

  async store(file: Partial<Express.Multer.File>, options: StoreFileOptions): Promise<string> {
    try {
      const extension = getFileExtension(file);
      const fileName = getFileName(file);
      const path = options.path || '';
      let savePath = `${path}/${fileName}.${extension}`;

      // If disk is local, we need to add the root path
      if (!options.disk || options.disk == DriverType.LOCAL)
        savePath = `${this.config.get('storage.local.root')}/${savePath}`;

      // Save the file
      await this.storage.getDisk(options.disk).put(savePath, file.buffer);

      // Return the path
      return savePath;
    } catch (error) {
      throw error.message;
    }
  }

}

export interface StoreFileOptions {
  path?: string;
  disk?: DriverType
}

export interface BufferFile {
  buffer: Buffer;
  originalname: string;
}