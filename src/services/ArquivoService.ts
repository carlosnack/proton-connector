import internal from "stream";
import fs from "fs";
import ArquivoRepository from "../repositories/ArquivoRepository";
import { HttpError } from "../utils/httpError";

type Arquivo =
  | string
  | internal.Stream
  | NodeJS.ArrayBufferView
  | Iterable<string | NodeJS.ArrayBufferView>;

export default class ArquivoService {
  static async salvarArquivo(caminho: string, arquivo: Arquivo) {
    await fs.promises.writeFile(caminho, arquivo);
  }

  static async criarArquivo(nome: string, caminho: string, arquivo: Arquivo) {
    const arquivoCreated = await ArquivoRepository.criarArquivo(nome, caminho);

    await this.salvarArquivo(caminho, arquivo);

    return arquivoCreated;
  }

  static async acessarArquivo(arquivoId: number) {
    const arquivoFound = await ArquivoRepository.acessarArquivo(arquivoId);
    if (!arquivoFound) {
      throw new HttpError(
        400,
        `Não foi possível encontrar arquivo com o id ${arquivoId}`
      );
    }

    const arquivo = fs.createReadStream(arquivoFound.caminho);
    const arquivoInfo = await fs.promises.stat(arquivoFound.caminho);

    return { arquivo, arquivoInfo, arquivoFound };
  }
}
