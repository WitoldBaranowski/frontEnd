import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

import * as ace from 'ace-builds'

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements AfterViewInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("print(\"hello world\")");
    aceEditor.setTheme("ace/theme/tomorrow_night_blue");
    aceEditor.session.setMode("ace/mode/python");
    aceEditor.on("change", () => {
      console.log(aceEditor.getValue());
    });
  }

  retunCode() :string{
    const aceEditor = ace.edit(this.editor.nativeElement);
    return aceEditor.getValue();
  }

}
