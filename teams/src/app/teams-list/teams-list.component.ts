import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Team } from '../interfaces/team';
import { TeamsAndPlayersService } from '../teams-and-players.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
  teams!: Team[]
  teamForm!: FormGroup;
  isEdit: boolean = false;

  constructor(private teamsAndPlayersService: TeamsAndPlayersService) { }

  ngOnInit(): void {
    this.fetchTeams();
    
    this.teamForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'about': new FormControl(null, Validators.required),
      'player1': new FormControl(null, Validators.required),
      'player2': new FormControl(null, Validators.required),
      'player3': new FormControl(null, Validators.required),
      'player4': new FormControl(null, Validators.required),
      'player5': new FormControl(null, Validators.required),
    });
  }

  fetchTeams() {
    this.teamsAndPlayersService.fetchTeams()
    .subscribe({
      next: (response) => this.teams = response,
      error: (error) => console.error(error)
    });
  }

  onSubmit(): void {
    if(this.teamForm.status === "VALID") {
      this.teamsAndPlayersService.addNewTeam(this.teamForm.value)
      .subscribe(
        {
          next: () => {
            this.fetchTeams();
            this.teamForm.reset();
          },
          error: (error) => console.error(error)
        });
    }
  }

  onDelete(i: number, id?: string): void {
    this.teamsAndPlayersService.deleteTeam(id)
    .subscribe({
      next: () => this.teams.splice(i, 1),
      error: (error) => console.error(error)
    });
  }
}
