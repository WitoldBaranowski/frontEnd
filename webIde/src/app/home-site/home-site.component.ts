import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TextEditorComponent} from "./text-editor/text-editor.component";
import {CodeService} from "../code-upload/codeService";
import {RestapiService} from "../restapi.service";
import {LoginComponent} from "../login/login.component";
import {Student} from "../login/student";
import {StudentDTO} from "../code-upload/studentDTO";
import {stdoutDTO} from "../code-upload/stdoutDTO";

@Component({
  selector: 'app-home-site',
  templateUrl: './home-site.component.html',
  styleUrls: ['./home-site.component.css']
})
export class HomeSiteComponent implements OnInit {

  @ViewChild(TextEditorComponent) ace: TextEditorComponent;

  constructor(private service:RestapiService, private codeService: CodeService) { }

  student: StudentDTO;
  stdout: stdoutDTO;
  ngOnInit(): void {
    this.student = this.codeService.student;
    console.log(this.student);
  }

  takeCode(lbl,stdin){
    console.log(this.student);
    this.codeService.program = this.ace.retunCode();
    this.codeService.stdin = stdin;
    this.service.uploadCode(this.codeService).subscribe(data =>{
      this.stdout = data;
      this.service.setData(data)
      document.getElementById(lbl).innerText = this.stdout.stdout;
    });
  }
}
