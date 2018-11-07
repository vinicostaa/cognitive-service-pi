import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JAVA_API_AZURE } from "../app.api";
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
    
        try {
            const response = await this.http.post<Client>(`${JAVA_API_AZURE}/client/add`, client, httpOptions).toPromise();
            return response;
        } catch {
            return null;
        }
    }

    async checkDetect(face: Face): Promise<Client[]> {
        
        try {
            const response = await this.http.post<Client[]>(`${JAVA_API_AZURE}/client/detect`, face, httpOptions).toPromise();
            return response;
        } catch {
            return null;
        }
    }

    async listClients(): Promise<Client[]> {
        
        try {
            const response = await this.http.get<Client[]>(`${JAVA_API_AZURE}/client/list`, httpOptions).toPromise();
            return response;
        } catch {
            return null;
        }
    }

}