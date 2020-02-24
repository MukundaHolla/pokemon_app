import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  // Define API
  apiURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  /*========================================
    Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // HttpClient API get() method => Fetch list
  getPokemon() {
    return this.http.get(this.apiURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getPokemonDetails(id) {
    return this.http.get(this.apiURL + '/' + id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getNextPokemonRecord(url) {
    return this.http.get(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Server-Side Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
