import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from './interfaces/team'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TeamsAndPlayersService {
  constructor(private http: HttpClient) { }

  fetchTeams(): Observable<Team []> {
    return this.http.get<{[key: string]: Team}>('https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/teams.json')
    .pipe(map(response => {
      const teamsArray: Team[] = []
      for (const key in response) {
        teamsArray.push({...response[key], id: key});
      }
      return teamsArray;
    }));
  }

  fetchTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/teams/${id}.json`)
    .pipe(map(response => {
      const team: Team = {...response, id};;
      return team;
    }));
  }

  addNewTeam(postData: Team): Observable<{name: string}> {
    return this.http.post<{name: string}>('https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/teams.json', postData)
  }

  updateTeam(updatedTeam: Team) {
    return this.http.put<Team>(`https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/teams/${updatedTeam.id}.json`, updatedTeam)
  }

  deleteTeam(id?: string): Observable<null>{
    return this.http.delete<null>(`https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/teams/${id}.json`);
  }
}
