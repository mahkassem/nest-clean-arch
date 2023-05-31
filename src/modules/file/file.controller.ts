import { Body, Controller, Get, Inject, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ActionResponse } from 'src/core/base/responses/action.response';
import { Router } from 'src/core/base/router';
import { UploadValidator } from 'src/core/validators/upload.validator';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RolesGuard } from '../authentication/guards/roles.guard';
import { UploadFileRequest } from './dto/requests/upload-file.request';
import { UploadFileResponse } from './dto/responses/upload-file.response';
import { FileService } from './file.service';

@ApiTags(Router.Files.ApiTag)
@ApiHeader({ name: 'Accept-Language', required: false, description: 'Language header: en, ar' })
@Controller(Router.Files.Base)
export class FileController {
    constructor(@Inject(FileService) private readonly _service: FileService) { }

    @Get(Router.Files.Get)
    async get(@Param('dir') dir: string, @Param('filename') filename: string, @Res() res) {
        const filePath = this._service.getFileByDirAndFilename(dir, filename);
        res.sendFile(filePath);
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(Router.Files.Upload)
    @ApiConsumes('multipart/form-data')
    async upload(
        @Body() req: UploadFileRequest,
        @UploadedFile((new UploadValidator()).build()) file: Express.Multer.File
    ) {
        req.file = file;
        const path = await this._service.upload(req);
        const result = new UploadFileResponse(path);
        return new ActionResponse<UploadFileResponse>(result);
    }
}

