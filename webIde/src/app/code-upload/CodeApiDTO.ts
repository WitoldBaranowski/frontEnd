import {files} from "./files";

export class CodeApiDTO{
  language: string = "python";
  stdin: string;
  files: files[]

  constructor(stdin:string, files: files[]) {
    this.stdin = stdin;
    this.files = files;
  }

}
