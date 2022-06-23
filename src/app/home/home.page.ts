import { Component, OnInit } from '@angular/core';
import { NasaServiceService } from '../services/nasa-service.service';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  postLimit = 10;
  postsPage = 1;
  arrayPosts: any;

  constructor(
    public nasaService: NasaServiceService,
    public loadingController: LoadingController
  ) {}

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
      this.arrayPosts = this.arrayPosts.reverse();
    });
  }

  async getPagePosts() {
    const loading = await this.loadingController.create({
      message: 'Consultando datos de la NASA...',
    });
    loading.present();

    //llamamos a la funcion getPost de nuestro servicio.
    this.nasaService
      .getPostsPage(this.postLimit, this.postsPage)
      .then((data) => {
        this.arrayPosts = data;
        if (!Array.isArray(this.arrayPosts)) {
          this.arrayPosts = [this.arrayPosts];
        }
        this.arrayPosts = this.arrayPosts.reverse();
        loading.dismiss();
      });
  }

  async getMorePagePosts() {
    await this.nasaService
      .getPostsPage(this.postLimit, this.postsPage)
      .then((data) => {
        if (Array.isArray(this.arrayPosts)) {
          let dataArr = [];
          if (Array.isArray(data)) {
            dataArr = data;
          } else {
            dataArr = [data];
          }
          dataArr = dataArr.reverse();
          this.arrayPosts = this.arrayPosts.concat(dataArr);
        } else {
          this.arrayPosts = data;
          if (!Array.isArray(this.arrayPosts)) {
            this.arrayPosts = [this.arrayPosts];
          }
          this.arrayPosts = this.arrayPosts.reverse();
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
