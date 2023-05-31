import { ApiProperty } from "@nestjs/swagger";

export class UploadFileRequest {
    @ApiProperty({ type: 'file', required: true })
    file: Express.Multer.File;
}