import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiURL = 'https://www.omdbapi.com/';
  private apiKey = 'a7545b98'

  constructor(private httpClient:HttpClient) { }

  //to call api by search 
  searchMovies(searchTerm: string):Observable<any> {
    const url = `${this.apiURL}?apikey=${this.apiKey}&s=${encodeURIComponent(searchTerm)}`;
    return this.httpClient.get<any>(url);
  }

  //To call api by title
  getMovieDetailsByTitle(title: string): Observable<any> {
    const url = `${this.apiURL}?apikey=${this.apiKey}&t=${encodeURIComponent(title)}`;
    return this.httpClient.get<any>(url);
  }

  //to call api by imdbID
getMovieDetailsById(imdbID: string): Observable<any> {
  const url = `${this.apiURL}?apikey=${this.apiKey}&i=${imdbID}`;
  return this.httpClient.get<any>(url);
}

}
