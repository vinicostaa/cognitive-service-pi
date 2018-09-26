import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MEAT_API } from "../app.api";
import { Client } from '../model/client';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'

    })
};


@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }

    client:Client;

    /** POST: add a new hero to the database */
    checkRegister(client: Client): Observable<Client> {
        return this.http.post<Client>(`${MEAT_API}/client/add`, client, httpOptions)
            .pipe(

            );
    }
}