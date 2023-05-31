import { StorageService } from '@codebrew/nestjs-storage';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';
import { UploadFileRequest } from './dto/requests/upload-file.request';

@Injectable()
export class FileService {
    constructor(
        @Inject(StorageService) private readonly storage: StorageService,
        @Inject(ConfigService) private readonly config: ConfigService,
    ) { }

    getFileByDirAndFilename(dir: string, filename: string) {
        const path = join(__dirname, '../', '../', '../', 'storage', dir, filename);
        const exist = fs.existsSync(path);
        if (!exist)
            throw new NotFoundException('message.file_not_found');
        return path;
    }

    async upload(req: UploadFileRequest, dir = 'tmp') {
        try {
            const baseUrl = this.config.get('storage.local.root');
            const ext = req.file.originalname.split('.').pop();
            const randName = req.file.originalname.split('.').shift() + '-' + new Date().getTime();
            const fileLocation = `${baseUrl}/${dir}/${randName}.${ext}`;
            // use sharp to resize image
            const resizedImage = await sharp(req.file.buffer)
                .toBuffer();
            await this.storage.getDisk().put(fileLocation, resizedImage);
            return fileLocation;
        } catch (error) {
            throw error;
        }
    }
}
