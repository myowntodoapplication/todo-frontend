import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token or any other headers you want to set
    const authToken = 'YOUR_AUTH_TOKEN'; // Replace this with your actual token            
    const headers = request.headers.set('Authorization', `Bearer ${JSON.parse(localStorage.getItem("user")||"null")}`);
    // console.log(headers,"headers")

    // Clone the request and set the new headers
    const modifiedRequest = request.clone({ headers });

    // Pass the modified request to the next interceptor or to the HTTP handler
    return next.handle(modifiedRequest);
  }
}
