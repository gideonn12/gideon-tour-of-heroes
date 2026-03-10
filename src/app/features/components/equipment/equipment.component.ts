import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Equipment } from "../../models/equipment/equipment";
import { EquipmentService } from "../../services/equipment.service";
import { UpperCasePipe } from "@angular/common";
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero/hero';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../models/team/team';
import { appRoutes } from '../../../app/app.routes';
import { Router } from '@angular/router';

@Component({
  selector: "app-equipment",
  imports: [UpperCasePipe],
  providers: [EquipmentService, HeroService, TeamsService],
  templateUrl: "./equipment.component.html",
  styleUrl: "./equipment.component.scss",
})
export class EquipmentComponent implements OnInit {
  equipments = signal<Equipment[]>([]);
  heroes = signal<Hero[]>([]);
  teams = signal<Team[]>([]);
  private equipmentService: EquipmentService = inject(EquipmentService);
  private heroService: HeroService = inject(HeroService);
  private teamsService: TeamsService = inject(TeamsService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.equipmentService.getEquipments().subscribe((equipments: Equipment[]) => this.equipments.set(equipments));
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => this.heroes.set(heroes));
    this.teamsService.getTeams().subscribe((teams: Team[]) => this.teams.set(teams));
  }

  equipmentWithUsage = computed(() => {
    return this.equipments().map((equipment: Equipment) => ({
      ...equipment,
      isUsed: this.heroes().some(hero => hero.equipmentIds.includes(equipment.id)),
      usedBy: this.heroes().find(hero => hero.equipmentIds.includes(equipment.id))?.name,
      color: this.teams().find(team => team.id === this.heroes().find(hero => hero.equipmentIds.includes(equipment.id))?.teamId)?.color ?? '#e65beb',
    }));
  });

  onEquipmentClick(id: number) {
    this.router.navigate(["/", appRoutes.EQUIPMENT_DIALOG, id]);
  }
}
