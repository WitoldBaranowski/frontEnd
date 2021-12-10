import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "./login/student";
import {CodeService} from "./code-upload/codeService";
import {stdoutDTO} from "./code-upload/stdoutDTO";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private apiServerUrlStudent = "http://localhost:8080/student";
  private apiServerUrlCode = "http://localhost:8080/code";
  stdout: stdoutDTO;
  private apiData = new BehaviorSubject<stdoutDTO>(null);
  public apiData$ = this.apiData.asObservable();
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
     return this.http.post<stdoutDTO>(`${this.apiServerUrlCode}/add`,code,{headers}).pipe(map(data => {
      return data
    }))
  }

  setData(data: stdoutDTO) {
    this.apiData.next(data)
  }
}
