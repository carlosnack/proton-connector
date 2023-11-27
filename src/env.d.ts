declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;

    //Cep Api
    CEP_API_TOKEN: string;

    // Banco de dados
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
  }
}
