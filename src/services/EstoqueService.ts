import EstoqueRepository from '../repositories/EstoqueRespository'; // Importe o repositório Estoque corretamente

export default class EstoqueService {
  static async buscarEstoquePorIds(estoqueId?: string, produtoId?: number) {
    return EstoqueRepository.buscarEstoquePorIds(estoqueId, produtoId);
  }
  static async criarRegistroDeEstoque(produtoId: number, quantidade: number, estoqueId: string) {
    return EstoqueRepository.criarRegistroDeEstoque(produtoId, quantidade, estoqueId);
  }
}



