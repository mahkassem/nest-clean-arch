import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { readEnv } from './env.helper';

const getFileExtension = (file: Partial<Express.Multer.File>): string => {
  return file.originalname.split('.').pop();
}

const getFileName = (file: Partial<Express.Multer.File>): string => {
  return file.originalname.split('.').shift() + '-' + new Date().getTime();
}

function toUrl(path: string, direct = false): string {
  if (path && path.startsWith('http')) return path;
  const host = readEnv('APP_HOST');
  if (direct) return `${host}/${path}`;
  return `${host}/v1/${path}`;
}

function ensureDirExists(path: string): void {
  if (!fs.existsSync('storage' + path)) fs.mkdirSync('storage' + path);
}

function ensureFilesExists(paths: string[] | string): void {
  if (typeof paths === 'string') paths = [paths];
  const existsAll = paths.every((path) => fs.existsSync(path));
  if (!existsAll)
    throw new BadRequestException(
      'Not found: ' + paths.filter((path) => !fs.existsSync(path)).join(', '),
    );
}

function* moveTmpFile(
  file: string,
  dir: string,
): Generator<string, void> {
  ensureDirExists(dir);

  let newFilePath = file.replace('/tmp/', dir);

  // add prefix to file name to avoid duplicate file name
  const date = new Date().getTime();
  newFilePath = newFilePath.replace(/(\.[\w\d_-]+)$/i, `_${date}$1`);

  yield newFilePath;

  fs.renameSync(file, newFilePath);
}

function* moveTmpFiles(
  files: string[],
  dir: string,
): Generator<string[], void> {
  ensureDirExists(dir.slice(0, -1));

  const newFilePathes: string[] = files.map((file) => {
    let newPath = file.replace('/tmp/', dir);
    // add prefix to file name to avoid duplicate file name
    const date = new Date().getTime();
    newPath = newPath.replace(/(\.[\w\d_-]+)$/i, `_${date}$1`);
    return newPath;
  });

  yield newFilePathes;

  files.forEach((file, index) => fs.renameSync(file, newFilePathes[index]));
}


export {
  getFileExtension,
  getFileName,
  moveTmpFile,
  moveTmpFiles,
  toUrl,
  ensureDirExists,
  ensureFilesExists,
}