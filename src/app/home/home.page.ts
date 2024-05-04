import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, 
  IonTabBar, IonTabButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
//movie service
import { MovieService } from '../Services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, 
    IonTabBar, IonTabButton, RouterLink, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonButton],
})
export class HomePage implements OnInit{

  //array of movies to pick randomly from
  movies = [
    { title: "Tenacious D in the Pick of Destiny", year: "2006"},
    { title: "The Fifth Element", year: "1997"},
    { title: "The Dirt", year: "2019"},
    { title: "Labyrinth", year: "1986"},
    { title: "Lara Croft: Tomb Raider", year: "2001"},
    { title: "Big Trouble in Little China", year: "1986"},
    { title: "Labyrinth", year: "1986"},
    { title: "Terminator 2: Judgment Day", year: "1991"},
    { title: "Zoolander", year: "2001"},
    { title: "Blades of Glory", year: "2007"}
  ];

  selectedMovie: any = {};

  constructor(private movieService:MovieService) {}

  ngOnInit() {
    this.selectRandomMovie();
  }

  //randomly picks a number then chooses that number in the array
  selectRandomMovie() {
    const randomIndex = Math.floor(Math.random() * this.movies.length);
    this.selectedMovie = this.movies[randomIndex];
  }
}
