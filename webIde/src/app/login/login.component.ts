import {Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Router} from "@angular/router";
import {Student} from "./student";
import {HttpErrorResponse} from "@angular/common/http";
import {CodeService} from "../code-upload/codeService";
import {StudentDTO} from "../code-upload/studentDTO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent implements OnDestroy{

  username:string;
  password:string;
  message:any;

  student: StudentDTO;


  constructor(private service:RestapiService, private router:Router, private codeService: CodeService) { }


  doLoginWithStudent(){
    this.service.getStudent(this.username,this.password).subscribe(
      (response: Student)=>{
        this.student = response;
        console.log(this.student);
        this.router.navigate(["/home-site"])
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
  ngOnDestroy() {
    this.codeService.student = this.student;
    console.log(this.student);
  }

}
