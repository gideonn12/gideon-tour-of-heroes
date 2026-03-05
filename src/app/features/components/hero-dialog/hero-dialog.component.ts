import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
  visible = signal<boolean>(true);
  teams = signal<Team[]>([]);
  equipment = signal<Equipment[]>([]);
  footerButtons: FooterButton[] = [];
  allEquipment!: string[];
  filteredEquipment: string[] = [];
  selectedEquipment: string[] = [];
  allTeams!: string[];
  filteredTeams: string[] = [];
  selectedTeam: string = "";
  allStatus = HERO_STATUSES;
  filteredStatus: string[] = [];
  selectedStatus: string = "";
  private heroService: HeroService = inject(HeroService);
  private teamsService: TeamsService = inject(TeamsService);
  private equipmentService: EquipmentService = inject(EquipmentService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: number = Number(this.route.snapshot.paramMap.get("id"));

  ngOnInit(): void {
    this.initializeButtons();
    this.getHero();
    this.initTeams();
    this.initEquipments();
  }

  initTeams(): void {
    this.teamsService.getTeams().subscribe((teams) => this.teams.set(teams));
    this.allTeams = this.teams().map((team) => team.name);
    this.selectedTeam = this.teams().find((team) => team.id === this.hero()!.teamId)!.name;
  }

  initEquipments(): void {
    this.equipmentService.getEquipment().subscribe((equipment) => this.equipment.set(equipment));
    this.allEquipment = this.equipment().map((equipment) => equipment.type);
    this.selectedEquipment = this.equipment().filter((equipment) => this.hero()!.equipmentIds.includes(equipment.id)).map((equipment) => equipment.type);
  }

  initializeButtons(): void {
    this.footerButtons = [
      { label: "Delete", action: () => this.delete() },
      { label: "Reset", action: () => this.reset() },
      { label: "Save", action: () => this.save() },
      { label: "Back", action: () => this.goBack() },
    ];
  }

  getHero(): void {
    this.heroService.getHero(this.id).subscribe((hero) => this.hero.set({ ...hero }));
    this.selectedStatus = this.hero()!.status;
  }

  save(): void {
    this.heroService.updateHero({
      id: this.hero()!.id,
      name: this.hero()!.name,
      status: this.selectedStatus,
      teamId: this.teams().find((team) => team.name === this.selectedTeam)?.id!,
      equipmentIds: this.equipment().filter((equipment) => this.selectedEquipment.includes(equipment.type)).map((equipment) => equipment.id),
      maxWeight: this.hero()!.maxWeight,
    });
    this.goBack();
  }

  reset(): void {
    this.heroService.resetHero(this.id);
    this.selectedStatus = this.hero()!.status;
    this.selectedTeam = this.teams().find((team) => team.id === this.hero()!.teamId)!.name;
    this.selectedEquipment = this.equipment().filter((equipment) => this.hero()!.equipmentIds.includes(equipment.id)).map((equipment) => equipment.type);
  }

  delete(): void {
    this.heroService.deleteHero(this.id);
    this.goBack();
  }

  goBack(): void {
    this.visible.set(false);
  }

  filterEquipment(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filteredEquipment = this.allEquipment.filter((item) => item.toLowerCase().includes(query));
  }

  filterTeam(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filteredTeams = this.allTeams.filter((item) => item.toLowerCase().includes(query));
  }

  filterStatus(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filteredStatus = this.allStatus.filter((item) => item.toLowerCase().includes(query));
  }
}
