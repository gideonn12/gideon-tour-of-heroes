import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { Hero, HERO_STATUSES } from "../../models/hero/hero";
import { ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AutoComplete, AutoCompleteCompleteEvent } from "primeng/autocomplete";
import { TeamsService } from '../../services/teams.service';
import { EquipmentService } from '../../services/equipment.service';
import { Team } from "../../models/team/team";
import { Equipment } from "../../models/equipment/equipment";
import { validateAlphanumeric } from '../../utils/validator';

@Component({
  selector: "app-hero-dialog",
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    Button,
    Dialog,
    PrimeTemplate,
    CommonModule,
    AutoComplete,
  ],
  providers: [HeroService, TeamsService, EquipmentService],
  templateUrl: "./hero-dialog.component.html",
  styleUrls: ["./hero-dialog.component.scss"],
})
export class HeroDialogComponent implements OnInit {
  hero = signal<Hero | null>(null);
  originalHero = signal<Hero | null>(null);
  visible = signal<boolean>(false);
  teams = signal<Team[]>([]);
  equipment = signal<Equipment[]>([]);
  filteredEquipment: Equipment[] = [];
  selectedEquipment = signal<Equipment[]>([]);
  filteredTeams: Team[] = [];
  selectedTeam = signal<Team | null>(null);
  allStatus = HERO_STATUSES;
  filteredStatus: string[] = [];
  selectedStatus = signal<string>("");
  selectedName = signal<string>("");
  nameErrors = signal<string[]>([]);
  heroes = signal<Hero[]>([]);
  footerButtons: FooterButton[] = [
    { label: "Delete", action: () => this.delete(), disabled: () => this.id == null },
    { label: "Reset", action: () => this.reset() , disabled: () => !this.hasChanges() },
    { label: "Save", action: () => this.save() , disabled: () => !this.hasChanges() },
    { label: "Back", action: () => this.goBack() }];
  private heroService: HeroService = inject(HeroService);
  private teamsService: TeamsService = inject(TeamsService);
  private equipmentService: EquipmentService = inject(EquipmentService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: number | null = this.route.snapshot.paramMap.get("id")? Number(this.route.snapshot.paramMap.get("id")) : null;
  private heroesLength: number = 20;

  ngOnInit(): void {
    if (!this.id) {
      this.initNewHero();
    }
    else {
      this.getHero();
    }
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes.set(heroes);
    });
    this.initTeams();
    this.initEquipments();
  }

  initTeams(): void {
    this.teamsService.getTeams().subscribe((teams) => {
      this.teams.set(teams);
      this.selectedTeam.set(this.teams().find((team) => team.id === this.hero()!.teamId)?? null);
    });
  }

  initEquipments(): void {
    this.equipmentService.getEquipments().subscribe((equipment) => {
      this.equipment.set(equipment.filter(e => !this.heroes().some(h => h.equipmentIds.includes(e.id)) || this.hero()?.equipmentIds.includes(e.id)));
      this.selectedEquipment.set(this.equipment().filter((equipment) => this.hero()?.equipmentIds.includes(equipment.id)));
    });
  }

  getHero(): void {
    this.heroService.getHero(this.id!).subscribe((hero) => {
      this.hero.set({ ...hero });
      this.originalHero.set({ ...hero });
      this.selectedStatus.set(this.hero()!.status);
      this.selectedName.set(this.hero()!.name);
      this.visible.set(true);
    });
  }

  save(): void {
    if (!this.id) {
      this.heroService.addHero({
        id: this.hero()!.id,
        name: this.selectedName(),
        status: this.selectedStatus(),
        teamId: this.selectedTeam()?.id ?? null,
        equipmentIds: this.selectedEquipment().map((equipment) => equipment.id),
        maxWeight: this.hero()!.maxWeight,
      });
    }
    else {
      this.heroService.updateHero({
        id: this.hero()!.id,
        name: this.selectedName(),
        status: this.selectedStatus(),
        teamId: this.selectedTeam()?.id ?? null,
        equipmentIds: this.selectedEquipment().map((equipment) => equipment.id),
        maxWeight: this.hero()!.maxWeight,
      });
    }
    const previousTeam = this.teams().find((team: Team) => team.heroIds.includes(this.hero()!.id));
    if (previousTeam) {
      this.teamsService.updateTeam({
        ...previousTeam,
        heroIds: previousTeam.heroIds.filter((id) => id !== this.hero()!.id)
      });
    }
    this.teamsService.updateTeam({
      ...this.selectedTeam()!,
      heroIds: [...(this.selectedTeam()!.heroIds ?? []), this.hero()!.id],
    });
    this.goBack();
  }

  reset(): void {
    this.heroService.resetHero(this.id!);
    this.selectedStatus.set(this.hero()!.status);
    this.selectedTeam.set(this.teams().find((team) => team.id === this.hero()!.teamId)?? null);
    this.selectedEquipment.set(this.equipment().filter((equipment) => this.hero()!.equipmentIds.includes(equipment.id)));
    this.selectedName.set(this.hero()!.name);
  }

  delete(): void {
    this.heroService.deleteHero(this.id!);
    this.goBack();
  }

  goBack(): void {
    this.visible.set(false);
  }

  filterEquipment(event: AutoCompleteCompleteEvent): void {
    this.filteredEquipment = this.equipment().filter((e) => e.type.toLowerCase().includes(event.query.toLowerCase()));
  }

  filterTeam(event: AutoCompleteCompleteEvent): void {
    this.filteredTeams = this.teams().filter((t) => t.name.toLowerCase().includes(event.query.toLowerCase()));
  }

  filterStatus(event: AutoCompleteCompleteEvent): void {
    this.filteredStatus = this.allStatus.filter((item) => item.toLowerCase().includes(event.query.toLowerCase()));
  }

  hasChanges = computed(() => {
    if (!this.originalHero() || !this.hero()) {
      return false;
    }
    const nameChanged = this.originalHero()?.name !== this.selectedName();
    const statusChanged = this.originalHero()?.status !== this.selectedStatus();
    const teamChanged = this.originalHero()?.teamId !== (this.selectedTeam()?.id ?? null);
    const equipmentChanged = this.selectedEquipment().length !== this.originalHero()!.equipmentIds.length ||
      this.selectedEquipment().some(e => !this.originalHero()!.equipmentIds.includes(e.id));
    return nameChanged || statusChanged || teamChanged || equipmentChanged;
  });

  overWeight = computed(() => {
    if (!this.hero()) {
      return false;
    }
    const totalWeight = this.selectedEquipment().reduce((sum, equipment) => sum + equipment.weight, 0);
    return totalWeight > this.hero()!.maxWeight;
  });

  onNameChange(value: string): void {
    validateAlphanumeric(value, this.selectedName, this.nameErrors);
  }

  initNewHero(): void {
    const newHero: Hero = {
      id: this.heroesLength + 1,
      name: '',
      status: HERO_STATUSES[0],
      teamId: null,
      equipmentIds: [],
      maxWeight: 10,
    };
    this.hero.set({ ...newHero });
    this.originalHero.set({ ...newHero });
    this.selectedStatus.set(newHero.status);
    this.selectedName.set(newHero.name);
    this.visible.set(true);
  }
}
