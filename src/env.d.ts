declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;
    CEP_API_TOKEN: string;
  }
}
