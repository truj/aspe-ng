export class ServerState {
  online     = false;
  success    = false;
  url        = '';
  httpStatus = 0;
  errorMsg   = '';
  jsonResponse?: string;

  constructor(url: string) {
    this.url = url;
  }

  setOnline(online: boolean): void {
    this.online = online;
  }

  setSuccess(success: boolean): void {
    this.success = success;
  }

  setHttpStatus(status: number): void {
    this.httpStatus = status;
  }

  setErrorMsg(txt: string): void {
    this.errorMsg = txt;
  }

  setJsonResponse(json: string): void {
    this.jsonResponse = json;
  }
}
