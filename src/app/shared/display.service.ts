import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  baseURL='http://localhost:2004'
  constructor(private http:HttpClient) { }


  service_getnotesuseridbased(user_id:any) {    
    return this.http.get(`${this.baseURL}/api/display/getnotesuseridbased/${user_id}`);  
}

service_deleteanote(note_id:number){
  return this.http.get(`${this.baseURL}/api/display/deleteanote/${note_id}`);  
}
}
