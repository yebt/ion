import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventosServService {
  // url = 'https2://jsonplaceholder.typicode.com/posts';
  apiKey = 'EAQxMV1pkXzBwEi2UVo2agsMOjajgCV67pP3Kce5';
  url = 'https://api.nasa.gov/planetary/apod?api_ke=' + this.apiKey;

  constructor(public http: HttpClient) {}

  getInfo() {
    return new Promise((resolve) => {
      this.http.get(this.url).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
