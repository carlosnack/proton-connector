import EstoqueRepository from "../repositories/EstoqueRespository"; // Importe o repositório Estoque corretamente

export default class EstoqueService {
  static async buscarEstoquePorIds(estoqueId?: string, produtoId?: number) {
    return EstoqueRepository.buscarEstoquePorIds(estoqueId, produtoId);
  }
  static async criarRegistroDeEstoque(produtoId: number, quantidade: number) {
    return EstoqueRepository.criarRegistroDeEstoque(produtoId, quantidade);
  }

  static async atualizarEstoque(produtoId: number, quantidade: number) {
    return EstoqueRepository.atualizarEstoque(produtoId, quantidade);
  }

  static async deletarEstoque(produtoId: number, estoqueId: string) {
    return EstoqueRepository.deletarEstoque(estoqueId, produtoId);
  }
}
