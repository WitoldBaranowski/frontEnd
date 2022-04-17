import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "./login/student";
import {CodeService} from "./code-upload/codeService";
import {stdoutDTO} from "./code-upload/stdoutDTO";
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {StudentDTO} from "./code-upload/studentDTO";


@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private apiServerUrlStudent = "http://localhost:8080/student";
  private apiServerUrlCode = "http://localhost:8080/code";
  stdout: stdoutDTO;
  private apiData = new BehaviorSubject<stdoutDTO>(null);
  public apiData$ = this.apiData.asObservable();
  public loginForm: FormGroup;

  constructor(private http:HttpClient) { }

  public login(username:string, password:string){
    const formParams = new FormData();

    if (username !== undefined) {
      formParams.append('username', <any>username);
    }
    if (password !== undefined) {
      formParams.append('password', <any>password);
    }

    return this.http.post<any>(`http://localhost:8080/auth`,
      formParams,
      {
        responseType: <any>"text",
        withCredentials: true
      }
    );

    /*const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})
    return this.http.get("http://localhost:8080/student/a",{headers,responseType:'text'as'json'})*/
  }

  public getStudent(username:string, password:string): Observable<StudentDTO>{
    /*const headers=new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)})*/
    return this.http.get<StudentDTO>(`${this.apiServerUrlStudent}/find/${username}`
      )
  }

  public uploadCode(code: CodeService){
    let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(/*code.student.username*/"b" + ":" + "kot"/*code.student.password*/)})
     return this.http.post<stdoutDTO>(`${this.apiServerUrlCode}/add`,code,{headers}).pipe(map(data => {
      return data
    }))
  }

  setData(data: stdoutDTO) {
    this.apiData.next(data)
  }
}
