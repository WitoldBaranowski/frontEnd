import {Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Router} from "@angular/router";
import {Student} from "./student";
import {HttpErrorResponse} from "@angular/common/http";
import {CodeService} from "../code-upload/codeService";
import {StudentDTO} from "../code-upload/studentDTO";
import {switchMap} from "rxjs/operators";
import {UserDTO} from "../code-upload/userDTO";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "./popup/popup.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent implements OnDestroy{

  student: StudentDTO;

  username:string;
  password:string;
  message:any;

  supervisorId: number;
  email: string;
  rpass: string;
  pass: string;
  usern: string;


  constructor(private service:RestapiService, private router:Router, private codeService: CodeService,
              public dialog: MatDialog) { }


  doLoginWithStudent(){
    this.service.login(this.username,this.password).pipe(
      switchMap(()=>this.service.getStudent(this.username)))
      .subscribe(
        (response: StudentDTO) => {
          this.student = response;
          console.log(this.student);
          this.router.navigate(["/home-site"])
        },
        (error: HttpErrorResponse) => {
          this.dialog.open(PopupComponent, {
            width: '500px',
            data: "Hasło lub nazwa użytkownika są niepoprawne"
          });
        }
    )
  }

  createNewStudent(){
    let userDTO = new UserDTO(this.usern, this.pass, this.email,true, this.supervisorId);

    if(this.rpass!=this.pass){
      this.dialog.open(PopupComponent, {
        width: '300px',
        data: "Hasła nie są identyczne"
      });
    }else{
      this.service.addStudent(userDTO).subscribe(
        data =>{
          if(data==true){
            const dialogRef = this.dialog.open(PopupComponent, {
              width: '300px',
              data: "Taki użytkownik już istnieje"
            });
          }else{
            const dialogRef = this.dialog.open(PopupComponent, {
              width: '700px',
              data: "Użytkownik utworzony poprawnie, teraz możesz zalogować się przy pomocy podanych danych"
            });
          }
        }
      )
    }

  }

  ngOnDestroy() {
    this.codeService.student = this.student;
    console.log(this.student);
  }

}
