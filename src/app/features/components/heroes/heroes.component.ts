import { Component, computed, inject, OnInit, signal, } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Hero, statusColorMap, HeroStatus } from '../../models/hero/hero';
import { HeroService } from '../../services/hero.service';
import { appRoutes } from '../../../app/app.routes';
import { Listbox } from 'primeng/listbox';
import { PrimeTemplate } from 'primeng/api';
import { Router } from '@angular/router';
import { NgStyle } from "@angular/common";
import { Team } from "../../models/team/team";
import { Equipment } from "../../models/equipment/equipment";
import { EquipmentService } from "../../services/equipment.service";
import { TeamsService } from "../../services/teams.service";
import { Button } from 'primeng/button';
import {InputText} from "primeng/inputtext";

@Component({
  selector: 'app-heroes',
  imports: [FormsModule, Listbox, PrimeTemplate, NgStyle, Button, InputText],
  providers: [HeroService, TeamsService, EquipmentService],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes = signal<Hero[]>([]);
  teams = signal<Team[]>([]);
  equipments = signal<Equipment[]>([]);
  searchQuery = signal<String>("");
  private router: Router = inject(Router);
  private heroService: HeroService = inject(HeroService);
  private equipmentService: EquipmentService = inject(EquipmentService);
  private teamsService: TeamsService = inject(TeamsService);

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => this.heroes.set(heroes));
    this.teamsService.getTeams().subscribe((teams: Team[]) => this.teams.set(teams));
    this.equipmentService.getEquipments().subscribe((equipments: Equipment[]) => this.equipments.set(equipments));
  }

  onItemChange(event: any): void {
    this.router.navigate(["/", appRoutes.HERO_DIALOG, event.value]);
  }

  getStatusColor(status: HeroStatus): string {
    return statusColorMap[status];
  }

  heroesWithTeamsEquipment = computed(() => {
    return this.heroes().map(hero => ({
      ...hero,
      teamName: this.teams().find(team => team.id === hero.teamId)?.name,
      teamColor: this.teams().find(team => team.id === hero.teamId)?.color,
      equipments: this.equipments().filter(equipment => hero.equipmentIds.includes(equipment.id)).map(equipment => equipment.icon),
    }));
  });

  filteredHeroes = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.heroesWithTeamsEquipment();
    }

    return this.heroesWithTeamsEquipment().filter(hero =>
      hero.name.toLowerCase().includes(query) || hero.teamName?.toLowerCase().includes(query))
  });

  addNewHero(): void {
    this.router.navigate(["/", appRoutes.HERO_DIALOG]);
  }
}
