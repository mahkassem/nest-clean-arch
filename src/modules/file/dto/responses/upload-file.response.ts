import { toUrl } from "src/core/helpers/file.helper";

export class UploadFileResponse {
    path: string;
    url: string;

    constructor(path: string) {
        this.path = path;
        this.url = toUrl(this.path);
    }
}

