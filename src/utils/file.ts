import { join } from "path";

export const fileToSaveFolderPath = (fileName: string) =>
  join(__dirname, "..", "..", "files", fileName);
