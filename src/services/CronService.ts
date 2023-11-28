import cron from "node-cron";
import EntregaRepository from "../repositories/EntregaRepository";

export default class CronService {
  static setUpdateStatusCron(exp: string = "*/2 * * * *") {
    const config = {
      scheduled: true,
      timezone: "America/Sao_Paulo", // Substitua pelo fuso horário desejado
    };

    cron.schedule(
      exp,
      async () => {
        await EntregaRepository.atualizarStatusEntrega();
      },
      config
    );
  }
}
