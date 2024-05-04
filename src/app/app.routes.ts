import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'popular',
    loadComponent: () => import('./popular/popular.page').then( m => m.PopularPage)
  },
  {
    path: 'suggestion',
    loadComponent: () => import('./suggestion/suggestion.page').then( m => m.SuggestionPage)
  },
];
