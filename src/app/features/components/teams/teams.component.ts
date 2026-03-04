import { Component, inject, OnInit, signal } from '@angular/core';
import { Team } from '../../models/team/team';
import { loadTeams } from '../../../store/teams/actions';
import { Store } from '@ngrx/store';
import { selectAllTeams } from '../../../store/teams/selector';
import { UpperCasePipe } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-teams',
  imports: [UpperCasePipe],
  providers: [HeroService],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  teams = signal<Team[]>([]);
  private store: Store<any> = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadTeams());
    this.store.select(selectAllTeams).subscribe((teams: Team[]) => this.teams.set(teams));
  }
}
