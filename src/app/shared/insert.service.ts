import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertService {


  baseURL='http://localhost:2004'
  constructor(
    private http:HttpClient
  ) { }

  service_insert(object:any){    
    return this.http.post(`${this.baseURL}/api/insert/insert`,object);
  }

}
