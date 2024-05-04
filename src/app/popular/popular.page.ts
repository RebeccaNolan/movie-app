import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MovieService } from '../Services/movie.service';
import { Observable } from 'rxjs';
//plugin
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, IonList, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonButtons,
IonBackButton]
})


export class PopularPage implements OnInit {

  movies: Observable<any>[] = []; //empty observable array to store results from movieService

  //array of top movies
  popularMovies = [
    { title: "Dune: Part Two", imdbID: "tt15239678" },
    { title: "Joker: Folie à Deux", imdbID: "tt11315808" },
    { title: "A Quiet Place: Day One", imdbID: "tt13433802" },
    { title: "Love Lies Bleeding", imdbID: "tt19637052" },
    { title: "Furiosa: A Mad Max Saga", imdbID: "tt12037194" },
    { title: "The Lord of the Rings: The War of the Rohirrim", imdbID: "tt14824600" },
    { title: "Deadpool & Wolverine", imdbID: "tt6263850" },
    { title: "Despicable Me 4", imdbID: "tt7510222" },
    { title: "Spider-Man: Beyond the Spider-Verse", imdbID: "tt16360004" },
    { title: "Beetlejuice Beetlejuice", imdbID: "tt2049403" },
];

  //injects movieService
  constructor(private movieService:MovieService) { }

  ngOnInit() {
    this.loadPopularMovies();
  }

  //Maps over popularMovies, asyncronously fetches data
  loadPopularMovies() {
    this.movies = this.popularMovies.map(movie => 
      this.movieService.getMovieDetailsById(movie.imdbID)
    );
  }

  //uses browser plugin to open IMDB page
  async openIMDB(imdbID: string) {
    await Browser.open({ url: `https://www.imdb.com/title/${imdbID}` });
  }
}
