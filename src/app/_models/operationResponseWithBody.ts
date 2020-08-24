export class OpsBodyResponse {
    Succeeded: boolean;
    Message: string;
    url: any;
    statusCode: number;
    responseBody: any;

    constructor(succeeded: boolean, message: string, url: any, statusCode: number, responseBody: any) {
      this.Succeeded = succeeded;
      this.Message = message;
      this.url = url;
      this.statusCode = statusCode;
      this.responseBody = responseBody;
    }

}
