import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogUserService {
  constructor(protected http: HttpClient) {}

  /**
   * Uses saves Keywords of searched crypto currency in MongoDB.
   * @param {string} keyword string from search input.
   * pipe is used with map to get result from node.js band-end.
   */
  logKeywords(keyword: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`keywords/save/${keyword}`, {
        headers: headers,
      })
      .pipe(map((res) => console.log(res)));
  }

  /**
   * Saves current selected crypto currency in MongoDB.
   * @param {string} cryptoCurrency when was selected in dropdown.
   * pipe is used with map to get result from node.js band-end.
   */
  logSelectedValue(cryptoCurrency: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`selectedValue/save/${cryptoCurrency}`, {
        headers: headers,
      })
      .pipe(map((res) => console.log(res)));
  }

  /**
   * Get's all keywords from MongoDB with HTTP request
   */
  getAllKeywords() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`keywords`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }

  /**
   * Get's all selected crypto currencies from MongoDB with HTTP request
   */
  getSelectedValues() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`selectedValue`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }
}
