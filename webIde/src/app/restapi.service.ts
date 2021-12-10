import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "./login/student";
import {CodeService} from "./code-upload/codeService";
import {stdoutDTO} from "./code-upload/stdoutDTO";

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private apiServerUrlStudent = "http://localhost:8080/student";
  private apiServerUrlCode = "http://localhost:8080/code";
  stdout: stdoutDTO;
  constructor(private http:HttpClient) { }

  public login(username:string, password:string){
    const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
    return this.http.get("http://localhost:8080/student/a",{headers,responseType:'text'as'json'})
  }

  public getStudent(username:string, password:string): Observable<Student>{
    const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
    return this.http.get<Student>(`${this.apiServerUrlStudent}/find/${username}`,{headers})
  }

  public uploadCode(code: CodeService):stdoutDTO{
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(code.student.username + ":" + code.student.password)})
     this.http.post<stdoutDTO>(`${this.apiServerUrlCode}/add`,code,{headers}).subscribe(data => {
      this.stdout = data;
      console.log(this.stdout);
      return this.stdout
    })
      return this.stdout
  }

}
