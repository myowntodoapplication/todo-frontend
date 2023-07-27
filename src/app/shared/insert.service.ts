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
  service_update(object:any){
    // console.log("SEVICE HT",object)
    return this.http.post(`${this.baseURL}/api/insert/update`,object);
  }

  service_get_Note_Data_From_id(note_id:Number){
    return this.http.get(`${this.baseURL}/api/insert/getNoteDataBasedOnId/${note_id}`);
  }

}
