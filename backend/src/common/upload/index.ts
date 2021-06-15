import util from 'util';
import { MulterConfig } from './upload.service';

export const upload = new MulterConfig().upload;
export const uploadMany = util.promisify(upload.array('files', 10));
export const uploadOne = util.promisify(upload.single('file'));
