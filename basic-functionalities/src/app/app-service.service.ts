import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  text: string = 'Jestem dostępny z poziomu każdego komponentu';

  constructor() { }
}
