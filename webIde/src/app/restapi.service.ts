import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "./login/student";
import {CodeService} from "./code-upload/codeService";
import {CodeApiDTO} from "./code-upload/CodeApiDTO";
import {files} from "./code-upload/files";

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private apiServerUrlStudent = "http://localhost:8080/student";
  private apiServerUrlCode = "http://localhost:8080/code";
  private apiInterpreter = "https://onecompiler.com/api/v1/run?access_token=tdCL9qZbYqVZuxmACqmsW425kNMMPBDyP53kgzC385PuzjnwY4QYRXnNhDrCPmx29pgSNhA2PENMMPBDyP53kgxePaYrR6pKce25kENMMPBDyP5Fu"
  public codeApi: CodeApiDTO;
  files: files;
  constructor(private http:HttpClient) { }

  public login(username:string, password:string){
    const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
    return this.http.get("http://localhost:8080/student/a",{headers,responseType:'text'as'json'})
  }

  public getStudent(username:string, password:string): Observable<Student>{
    const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
    return this.http.get<Student>(`${this.apiServerUrlStudent}/find/${username}`,{headers})
  }

  public uploadCode(code: CodeService){
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(code.student.username + ":" + code.student.password)})
    this.http.post<CodeService>(`${this.apiServerUrlCode}/add`,code,{headers}).subscribe(data => {
      code = data;
    })
    this.files = new files(code.program);
    this.codeApi = new CodeApiDTO("", [this.files]);
    headers=new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post<CodeService>(`${this.apiInterpreter}`,this.codeApi,{headers}).subscribe(data => {
      code = data;
    });
    console.log(this.codeApi);
  }

}
