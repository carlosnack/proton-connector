import * as httpStatus from 'http-status-codes';
export default class GenericException extends Error {
    statusCode: number;
    extras: any;
  
    constructor(params: { name: string; message: string; extras?: any; statusCode?: number }) {
      super(params.message);
      this.statusCode = params.statusCode || httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
      this.name = params.name;
      this.extras = params.extras;
  
      Object.setPrototypeOf(this, GenericException.prototype);
    }
  
    formatError() {
      return {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        extras: this.extras,
      };
    }
  }