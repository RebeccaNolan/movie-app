import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, 
  IonCardTitle, IonCheckbox, IonContent, IonHeader, IonRadio, IonRadioGroup, IonSearchbar, IonTabBar, 
  IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/angular/standalone';
//import movie service
import { MovieService } from '../Services/movie.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, 
    IonSearchbar, IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, RouterLink,
  IonButtons, IonBackButton, IonButton, IonCardContent]
})
export class SearchPage {

  //make local variable
  movies:any=[] = [];


  //injects movieService, router and storage
  constructor(private movieService:MovieService, private router:Router, private storage:Storage) { 
    this.storage.create();
  }

  searchForMovie(event:any): void {
    const searchTerm = event.detail.value;
    if(searchTerm && searchTerm.length > 2) {
      this.movieService.searchMovies(searchTerm).subscribe(data => {
        this.movies = data.Search;
      });
    }
  }

  //For displaying extra details
  toggleDetails(movie: any) {
    if (!movie.showDetails) {
      if (!movie.Plot) { 
        this.movieService.getMovieDetailsByTitle(movie.Title).subscribe(details => {
          movie.Plot = details.Plot;
          movie.Director = details.Director;
          movie.showDetails = true;
        });
      } else {
        movie.showDetails = true;
      }
    } else {
      movie.showDetails = false; // Hide details if already showing
    }
  }
  
}
