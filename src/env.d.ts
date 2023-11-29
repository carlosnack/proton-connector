declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;

    // Api
    API_URL: string;

    // Cep Api
    CEP_API_TOKEN: string;

    // Banco de dados
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;

    // Email
    MAILER_EMAIL: string;
    MAILER_PASSWORD: string;

    // JWT
    JWT_SECRET: string;
    TOKEN_LIFE: string;
  }
}
