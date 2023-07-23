import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DisplayComponent } from './components/display/display.component';
import { InsertComponent } from './components/insert/insert.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../app/components/auth/helper/http-interceptor';
import { ErrorInterceptor } from '../app/components/auth/helper/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LandingComponent,
    DisplayComponent,
    InsertComponent,    
  ],
  imports: [    
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,        
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
