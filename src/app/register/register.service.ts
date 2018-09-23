import { Injectable } from "../../../node_modules/@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { MEAT_API } from "../app.api";
import { HttpHeaders } from "../../../node_modules/@angular/common/http";
import { catchError } from "../../../node_modules/rxjs/internal/operators/catchError";
import { Http } from "../../../node_modules/@angular/http";
import { Client } from "../model/client";


@Injectable()
export class RegisterClient {
    constructor(private http: Http) { }

    // checkRegister(client: Object): Observable<string> {
    //     const headers = new Headers();
    //     headers.append('Content-type', 'application/json')
    //     return this.http.post(`${MEAT_API}/orders`,
    //         JSON.stringify(client),
    //         new RequestOptions({ headers: headers }))
    //         .map(response => response.json())
    //         .map(order => order.id);
    // }

    
      
    /** POST: add a new hero to the database */
    // checkRegister(client: Client): Observable<Object> {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //           'Content-Type':  'application/json'
            
    //         })
    //       };
          
    //     const result = this.http.post<Client>(MEAT_API, client, httpOptions)
    //         .pipe(
    //             // catchError(this.handleError('addHero', client))
    //         );

    //     return result;
    // }
}