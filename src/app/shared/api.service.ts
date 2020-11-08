import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://sistemas.busint.info:81/';

  getReferencias(){
    return this.http.get(this.BaseURI +'getReferencias');
  }

}
