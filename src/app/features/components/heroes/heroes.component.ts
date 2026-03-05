import { Component, computed, inject, OnInit, signal, } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Hero, statusColorMap, HeroStatus } from '../../models/hero/hero';
import { HeroService } from '../../services/hero.service';
import { appRoutes } from '../../../app/app.routes';
import { Listbox } from 'primeng/listbox';
import { PrimeTemplate } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../../store/hero/selector';
import { loadHeroes } from '../../../store/hero/actions';
import { NgStyle } from "@angular/common";
import { loadTeams } from "../../../store/teams/actions";
import { selectAllTeams } from "../../../store/teams/selector";
import { Team } from "../../models/team/team";
import { Equipment } from "../../models/equipment/equipment";
import { loadEquipment } from "../../../store/equipment/actions";
import { selectAllEquipments } from "../../../store/equipment/selector";

@Component({
  selector: 'app-heroes',
  imports: [FormsModule, Listbox, PrimeTemplate, NgStyle],
  providers: [HeroService],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes = signal<Hero[]>([]);
  teams = signal<Team[]>([]);
  equipments = signal<Equipment[]>([]);
  private store: Store<any> = inject(Store);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
    this.store.dispatch(loadTeams());
    this.store.dispatch(loadEquipment());
    this.store.select(selectAllHeroes).subscribe((heroes: Hero[]) => this.heroes.set(heroes));
    this.store.select(selectAllTeams).subscribe((teams: Team[]) => this.teams.set(teams));
    this.store.select(selectAllEquipments).subscribe((equipments: Equipment[]) => this.equipments.set(equipments));
  }

  onItemChange(event: any): void {
    this.router.navigate(["/", appRoutes.DETAIL, event.value]);
  }

  getStatusColor(status: HeroStatus): string {
    return statusColorMap[status];
  }

  heroesWithTeamsEquipment = computed(() => {
    const allTeams = this.teams();
    const allEquipments = this.equipments();
    return this.heroes().map(hero => ({
      ...hero,
      teamName: allTeams.find(team => team.id === hero.teamId)?.name,
      teamColor: allTeams.find(team => team.id === hero.teamId)?.color,
      equipments: allEquipments.filter(equipment => hero.equipmentIds.includes(equipment.id)).map(equipment => equipment.icon),
    }));
  });
}
