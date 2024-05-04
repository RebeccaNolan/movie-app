import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from '@ionic/angular/standalone';
//Storage - data persistence
import { Storage } from '@ionic/storage-angular';
//plugin
import { Browser } from '@capacitor/browser';

interface MoviesByGenre {

  comedy: MovieDetails[];
  action: MovieDetails[];
  nostalgic: MovieDetails[];
  kids: MovieDetails[];
  [key: string]: MovieDetails[];  
}

interface MovieDetails {
  title: string;
  year: string;
  imdbID: string;
}

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, IonList, IonRadioGroup, IonItem, IonLabel, IonRadio, 
  IonButtons, IonBackButton, IonButton]
})
export class SuggestionPage implements OnInit {
  
  genre: string = '';
  suggestedMovies: MovieDetails[] = []; //array to hold list of movies

  //list of movies
  moviesByGenre: MoviesByGenre = {
    comedy: [
      { title: "This is Spinal Tap", year: '1984', imdbID: "tt0088258" },
      { title: "Airplane!", year: '1980', imdbID: "tt0080339" },
      { title: "Monty Python's Life of Brian", year: '1979', imdbID: "tt0080339" },
      { title: "School of Rock", year: '2003', imdbID: "tt0332379" },
      { title: "Dumb and Dumber", year: '1994', imdbID: "tt0109686" }
    ],
    action: [
      { title: "Die Hard", year: '1988', imdbID: "tt0095016" },
      { title: "Aliens", year: '1986', imdbID: "tt0090605" },
      { title: "Kill Bill", year: '2003', imdbID: "tt0266697" },
      { title: "The Matrix", year: '1999', imdbID: "tt0133093" },
      { title: "True Lies", year: '1994', imdbID: "tt0111503" }
    ],
    nostalgic: [
      { title: "The Princess Bride", year: '1994', imdbID: "tt0093779" },
      { title: "Terminator 2: Judgement Day", year: '1991', imdbID: "tt0103064" },
      { title: "Raiders of the Lost Ark", year: '1981', imdbID: "tt0082971" },
      { title: "Predator", year: '1987', imdbID: "tt0093773" },
      { title: "Total Recall", year: '1990', imdbID: "tt0100802" }
    ],
    kids: [
      { title: "Coco", year: '2017', imdbID: "tt2380307" },
      { title: "Tangled", year: '2010', imdbID: "tt0398286" },
      { title: "Shrek", year: '2001', imdbID: "tt0126029" },
      { title: "Howl's Moving Castle", year: '2004', imdbID: "tt0347149" },
      { title: "Matilda", year: '1996', imdbID: "tt0117008" }
    ]
  };

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.genre = await this.storage.get('status') || ''; //sets to empty string if null
    this.updateSuggestions();
  }

  //assigns array of movies from moviesByGenre based on the selected genre, 
  //or sets to an empty array if no movies are found
  updateSuggestions() {
    this.suggestedMovies = this.moviesByGenre[this.genre] || [];
  }

  setGenre(genre: string) {
    this.genre = genre;
    this.storage.set('status', genre).then(() => {
      this.updateSuggestions();
    });
  }

  async openIMDB(imdbID: string) {
    await Browser.open({ url: `https://www.imdb.com/title/${imdbID}` });
  }
}
