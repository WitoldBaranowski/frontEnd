import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextEditorComponent } from './home-site/text-editor/text-editor.component';
import { AceModule } from 'ngx-ace-wrapper';
import { LoginComponent } from './login/login.component';
import {RestapiService} from "./restapi.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeSiteComponent } from './home-site/home-site.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CodeService} from "./code-upload/codeService";

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    LoginComponent,
    HomeSiteComponent
  ],
  imports: [
    BrowserModule,
    AceModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [RestapiService, CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
