import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NasaServiceService {
  apiKey = 'EAQxMV1pkXzBwEi2UVo2agsMOjajgCV67pP3Kce5';
  url = 'https://api.nasa.gov/planetary/apod?api_key=' + this.apiKey;

  constructor(public http: HttpClient) {}

  getPosts() {
    return new Promise((resolve) => {
      this.http.get(this.url).subscribe(
        (data) => {
          // console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  getPostsPage(postLimit: number, postsPage: number) {
    // &start_date=2022-06-10&end_date=2022-06-22

    const ignoredPages = postsPage - 1;
    const skipDays = ignoredPages * postLimit;
    let skipTSE = skipDays * 24 * 60 * 60 * 1000;
    const skipTSS = skipTSE + postLimit * 24 * 60 * 60 * 1000;

    if (ignoredPages > 0) {
      skipTSE = skipTSE + 24 * 60 * 60 * 1000;
    }
    const actualTS = new Date().getTime();

    const startDate = new Date(actualTS - skipTSS);
    const endDate = new Date(actualTS - skipTSE);

    const urldate = this.url.concat(
      '&start_date=' +
        startDate.getFullYear() +
        '-' +
        (startDate.getMonth() + 1) +
        '-' +
        startDate.getDate() +
        '&end_date=' +
        endDate.getFullYear() +
        '-' +
        (endDate.getMonth() + 1) +
        '-' +
        endDate.getDate()
    );

    return new Promise((resolve) => {
      this.http.get(urldate).subscribe(
        (data) => {
          // console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  getFormatDate(date: Date) {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1; // Months start at 0!
    const dd = date.getDate();
    let mms = '';
    let dds = '';

    if (dd < 10) {
      dds = '0' + dd;
    }
    if (mm < 10) {
      mms = '0' + mm;
    }
    const today = yyyy.toString() + '-' + mms + '-' + dds;
    return today;
  }
}
