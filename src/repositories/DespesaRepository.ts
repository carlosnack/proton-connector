import { Op } from "sequelize";
import Despesa from "../models/Despesa";

export default class DespesaRepository {
  static async criarDespesa(
    descricao: string,
    valor: number,
    data_vencimento: Date,
    status: boolean = false
  ): Promise<Despesa> {
    return Despesa.create({ descricao, valor, data_vencimento, status, data_criacao: new Date() });
  }

  static async buscarDespesa(descricao?: string): Promise<Despesa[]> {
    const condition = descricao ? { descricao: { [Op.like]: `%${descricao}%` } } : {};

    return Despesa.findAll({ where: condition });
  }

  static async acessarDespesa(despesaId: number): Promise<Despesa | null> {
    const despesas =  await Despesa.findAll({where: {despesaId}});
    return despesas[0];
  }

  static async atualizarDespesa(
    despesaId: number,
    updateInfo: Partial<Despesa>
  ): Promise<number> {
    const [affectedRows] = await Despesa.update(updateInfo, {
      where: { despesaId },
    });

    return affectedRows;
  }

  static async deletarDespesa(despesaId: number): Promise<number> {
    return Despesa.destroy({
      where: { despesaId },
    });
  }
  
  static async buscarDespesasPorIntervalo(
    dataCriacao?: Date,
    dataVencimento?: Date,
    status: boolean = false
  ): Promise<{ total: number }> {
    const condition: any = {
      status, // Utiliza o status passado como condição
    };
  
    if (dataCriacao) condition.data_criacao = { [Op.gte]: dataCriacao };
    if (dataVencimento) condition.data_vencimento = { [Op.lte]: dataVencimento };
  
    const total = await Despesa.sum('valor', { where: condition });
  
    return { total: total || 0 };
  }
  
  

}
