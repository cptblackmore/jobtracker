export class PassthroughError extends Error {
  code: string;
  status: number;
  isPassthrough = true;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'PassthroughError';
    this.code = code;
    this.status = status;
  }
}
