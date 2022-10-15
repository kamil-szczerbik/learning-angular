import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Team } from '../interfaces/team'
import { TeamsAndPlayersService } from '../teams-and-players.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team!: Team;
  teamForm!: FormGroup;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private teamsAndPlayersService: TeamsAndPlayersService
    ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.teamsAndPlayersService.fetchTeam(id)
    .subscribe({
      next: (response) => {
        this.team = response;
    
        this.teamForm = new FormGroup({
          'name': new FormControl(this.team.name, Validators.required),
          'about': new FormControl(this.team.about, Validators.required),
          'player1': new FormControl(this.team.player1, Validators.required),
          'player2': new FormControl(this.team.player2, Validators.required),
          'player3': new FormControl(this.team.player3, Validators.required),
          'player4': new FormControl(this.team.player4, Validators.required),
          'player5': new FormControl(this.team.player5, Validators.required),
        })},
      error: (error) => console.error(error)
    });
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onSubmit(): void {
    if(!this.teamForm.untouched) {
      let updatedTeam = this.teamForm.value;
      updatedTeam.id = this.team.id;

      this.teamsAndPlayersService.updateTeam(updatedTeam)
      .subscribe({
        next: () => {
          this.team = updatedTeam;
          this.isEdit = false;
        },
        error: (error) => console.error(error)
      });   
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
}
