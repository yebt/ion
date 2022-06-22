import { Component, OnInit } from '@angular/core';
import { NasaServiceService } from '../services/nasa-service.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  postLimit = 10;
  postsPage = 1;
  arrayPosts: any;

  constructor(public nasaService: NasaServiceService) {}

  ngOnInit() {
    // this.getPosts();
    this.getPagePosts();
  }

  ionViewDidEnter() {
    // this.getPosts();
  }

  getPosts() {
    //llamamos a la funcion getPost de nuestro servicio.
    this.nasaService.getPosts().then((data) => {
      this.arrayPosts = data;
      if (!Array.isArray(this.arrayPosts)) {
        this.arrayPosts = [this.arrayPosts];
      }
    });
  }

  getPagePosts() {
    //llamamos a la funcion getPost de nuestro servicio.
    this.nasaService
      .getPostsPage(this.postLimit, this.postsPage)
      .then((data) => {
        this.arrayPosts = data;
        if (!Array.isArray(this.arrayPosts)) {
          this.arrayPosts = [this.arrayPosts];
        }
      });
  }

  async getMorePagePosts() {
    await this.nasaService
      .getPostsPage(this.postLimit, this.postsPage)
      .then((data) => {
        if (Array.isArray(this.arrayPosts)){
          let dataArr = [];
          if (Array.isArray(data)) {
            dataArr = data;
          }else {
            dataArr = [data];
          }
          this.arrayPosts = this.arrayPosts.concat(dataArr);
        }else {
          this.arrayPosts = data;
          if (!Array.isArray(this.arrayPosts)) {
            this.arrayPosts = [this.arrayPosts];
          }
        }
      });
  }

  async loadData(event) {
    this.postsPage++;
    console.log('Cargando más posts...');
    await this.getMorePagePosts();
    console.log('Datos cargados');
    event.target.complete();
  }
}
