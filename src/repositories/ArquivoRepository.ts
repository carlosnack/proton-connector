import Arquivo from "../models/Arquivo";

export default class ArquivoRepository {
  static async criarArquivo(nome: string, caminho: string): Promise<Arquivo> {
    return Arquivo.create({ nome, caminho });
  }

  static async acessarArquivo(arquivoId: number) {
    return Arquivo.findByPk(arquivoId);
  }
}
