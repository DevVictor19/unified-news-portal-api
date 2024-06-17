enum APPLICATION_ERROR {
  INVALID_TOKEN_TYPE = 'INVALID_TOKEN_TYPE',
  INVALID_TOKEN = 'INVALID_TOKEN',
  NOT_FOUND = 'NOT_FOUND',
  EMAIL_IN_USE = 'EMAIL_IN_USE',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_SEARCH_OPERATOR = 'INVALID_SEARCH_OPERATOR',
  INVALID_SEARCH_JSON = 'INVALID_SEARCH_JSON',
  INVALID_SEARCH_FIELD = 'INVALID_SEARCH_FIELD',
  INVALID_SEARCH_VALUE = 'INVALID_SEARCH_VALUE',
  INVALID_ORDER_JSON = 'INVALID_ORDER_JSON',
  INVALID_ORDER_FIELD = 'INVALID_ORDER_FIELD',
  INVALID_ORDER_DIRECTION = 'INVALID_ORDER_DIRECTION',
}

export class ApplicationError extends Error {
  public httpStatus: number;
  public error: APPLICATION_ERROR;

  constructor(message: string) {
    super(message);
  }
}

export class InvalidTokenTypeError extends ApplicationError {
  constructor() {
    super('Invalid token type');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_TOKEN_TYPE;
  }
}

export class InvalidTokenError extends ApplicationError {
  constructor() {
    super('Invalid token');
    this.httpStatus = 401;
    this.error = APPLICATION_ERROR.INVALID_TOKEN;
  }
}

export class NotFoundError extends ApplicationError {
  constructor() {
    super('Not found');
    this.httpStatus = 404;
    this.error = APPLICATION_ERROR.NOT_FOUND;
  }
}

export class EmailInUseError extends ApplicationError {
  constructor() {
    super('Email already in use');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.EMAIL_IN_USE;
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor() {
    super('Unauthorized');
    this.httpStatus = 401;
    this.error = APPLICATION_ERROR.UNAUTHORIZED;
  }
}

export class ForbiddenError extends ApplicationError {
  constructor() {
    super('Forbidden');
    this.httpStatus = 403;
    this.error = APPLICATION_ERROR.FORBIDDEN;
  }
}

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('Invalid email or password');
    this.httpStatus = 401;
    this.error = APPLICATION_ERROR.INVALID_CREDENTIALS;
  }
}

export class EmailNotVerifiedError extends ApplicationError {
  constructor() {
    super('Email not verified');
    this.httpStatus = 401;
    this.error = APPLICATION_ERROR.EMAIL_NOT_VERIFIED;
  }
}

export class BadRequestError extends ApplicationError {
  constructor() {
    super('Bad request');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.BAD_REQUEST;
  }
}

export class InvalidSearchOperatorError extends ApplicationError {
  constructor() {
    super('Invalid search operator');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_SEARCH_OPERATOR;
  }
}

export class InvalidSearchJsonError extends ApplicationError {
  constructor() {
    super('Invalid search json');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_SEARCH_JSON;
  }
}

export class InvalidSearchFieldError extends ApplicationError {
  constructor() {
    super('Invalid search field');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_SEARCH_FIELD;
  }
}

export class InvalidSearchValueError extends ApplicationError {
  constructor() {
    super('Invalid search value');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_SEARCH_VALUE;
  }
}

export class InvalidOrderJsonError extends ApplicationError {
  constructor() {
    super('Invalid order json');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_ORDER_JSON;
  }
}

export class InvalidOrderFieldError extends ApplicationError {
  constructor() {
    super('Invalid order field');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_ORDER_FIELD;
  }
}

export class InvalidOrderDirectionError extends ApplicationError {
  constructor() {
    super('Invalid order direction');
    this.httpStatus = 400;
    this.error = APPLICATION_ERROR.INVALID_ORDER_DIRECTION;
  }
}
