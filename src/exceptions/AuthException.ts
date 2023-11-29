import { UNAUTHORIZED } from 'http-status-codes';
import GenericException from './GenericException';

export default class AuthException extends GenericException {
  static ResourceNotAllowed = 'ResourceNotAllowed';
  static JWTExpiredOrNotReceived = 'JWTExpiredOrNotReceived';
  static LoginDontExists = 'LoginDontExists';
  static LoginPasswordNotAllowed = 'LoginPasswordNotAllowed';

  static messageValues: { [key: string]: string } = {
    ResourceNotAllowed: 'Resource not allowed',
    JWTExpiredOrNotReceived: 'JWT expired or not received',
    LoginDontExists: 'Unable to login: email not found',
    LoginPasswordNotAllowed: 'Unable to login: wrong password',
  };

  static helpValues: { [key: string]: string } = {
    ResourceNotAllowed: "Check your permissions and the feature you're trying to access",
    JWTExpiredOrNotReceived: 'Maybe we forgot to set up the Unauthorized file',
    LoginDontExists: 'Check your email',
    LoginPasswordNotAllowed: 'Check your password. Maybe reset them?',
  };

  constructor(type: string) {
    const params = {
      name: 'AuthException',
      message: AuthException.messageValues[type],
      statusCode: UNAUTHORIZED,
      extras: {
        help: AuthException.helpValues[type],
      },
    };
    super(params);

    Object.setPrototypeOf(this, AuthException.prototype);
  }
}

