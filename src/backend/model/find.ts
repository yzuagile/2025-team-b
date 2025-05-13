import { FileManager } from "../utils/FileManager"

import * as fs from "fs";
import * as path from "path";

export function idExist(uuid: string): boolean {
    const basePath = FileManager._PATH;
    const filePath = path.join(basePath, `${uuid}.json`); // 拼接文件路徑
    return fs.existsSync(filePath); // 檢查文件是否存在
}

