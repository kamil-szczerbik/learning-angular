import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) {}

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`get hero id=${id}`))
    );
  }

  getHeroes(): Observable<Hero []> {
    return this.http.get<Hero []>(this.heroesUrl)
    .pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError<Hero []>('getHeroes, []'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put<any>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError('updateHero'))
    );
  }
  
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero []> { 
    if(!term.trim()) {
      return of([]);
    }

    const url: string = `${this.heroesUrl}/?name=${term}`;

    return this.http.get<Hero []>(url)
    .pipe(
      tap(x => x.length
        ?
        this.log(`found heroes matching ${term}`)
        :
        this.log(`no heroes matching ${term}`)
        ),
      catchError(this.handleError<Hero []>('searchHeroes', []))
    );
  }
}
