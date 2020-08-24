export class OperationResult {
  Succeeded: boolean;
  Message: string;
  item: any;

  constructor(succeeded: boolean, message: string, item: any) {
    this.Succeeded = succeeded;
    this.Message = message;
    this.item = item;
  }
}
