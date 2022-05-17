import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "./login/student";
import {CodeService} from "./code-upload/codeService";
import {stdoutDTO} from "./code-upload/stdoutDTO";
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {StudentDTO} from "./code-upload/studentDTO";
import {UserDTO} from "./code-upload/userDTO";


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
  }

  public addStudent(userDTO: UserDTO){
    return this.http.post<boolean>(`${this.apiServerUrlStudent}/add`,userDTO,{withCredentials:
        true})
  }

  public getStudent(username:string): Observable<StudentDTO>{
    return this.http.get<StudentDTO>(`${this.apiServerUrlStudent}/find/${username}`
       )
  }

  public uploadCode(code: CodeService){
     return this.http.post<stdoutDTO>(`${this.apiServerUrlCode}/add`,code).pipe(map(data => {
      return data
    }))
  }

  public logout(): Observable<string>{
    return this.http.get<string>(`http://localhost:8080/logout`)
  }

  setData(data: stdoutDTO) {
    this.apiData.next(data)
  }
}
