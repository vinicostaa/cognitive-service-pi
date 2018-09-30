import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MEAT_API } from "../app.api";
import { Client } from '../model/client';
import { Face } from '../model/Face';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'

    })
};


@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }
    
  

    async checkRegister(client: Client): Promise<Client> {
        debugger
        try {
            const response = await this.http.post<Client>(`${MEAT_API}/client/add`, client, httpOptions).toPromise();
            return response;
        } catch {
            return null;
        }
    }

    async checkDetect(face: Face): Promise<Client[]> {
        debugger
        try {
            const response = await this.http.post<Client[]>(`${MEAT_API}/client/detect`, face, httpOptions).toPromise();
            return response;
        } catch {
            return null;
        }
    }



}