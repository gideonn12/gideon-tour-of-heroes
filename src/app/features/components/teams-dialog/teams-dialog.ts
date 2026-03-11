import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Team } from '../../models/team/team';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';
import { Hero } from '../../models/hero/hero';
import { HeroService } from '../../services/hero.service';
import { MultiSelect } from 'primeng/multiselect';
import { validateAlphanumeric } from '../../utils/validator';

@Component({
  selector: "app-teams-dialog",
  imports: [
    Dialog,
    UpperCasePipe,
    FormsModule,
    Button,
    PrimeTemplate,
    MultiSelect
  ],
  providers: [TeamsService, HeroService],
  templateUrl: "./teams-dialog.html",
  styleUrl: "./teams-dialog.scss",
})
export class TeamsDialog implements OnInit {
  originalTeam = signal<Team | null>(null);
  team = signal<Team | null>(null);
  allHeroes = signal<Hero[]>([]);
  heroes = signal<Hero[]>([]);
  availableHeroes = signal<Hero[]>([]);
  selectedName = signal<string>("");
  selectedColor = signal<string>("");
  visible = signal<boolean>(true);
  nameErrors = signal<string[]>([]);
  footerButtons: FooterButton[] = [
    { label: "Delete", action: () => this.delete() , disabled: () => this.id === null },
    { label: "Reset", action: () => this.reset() , disabled: () => !this.hasChanges() },
    { label: "Save", action: () => this.save() , disabled: () => !this.hasChanges() },
    { label: "Back", action: () => this.goBack() }];
  private teamsService: TeamsService = inject(TeamsService);
  private heroService: HeroService = inject(HeroService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: number | null = this.route.snapshot.paramMap.get("id")? Number(this.route.snapshot.paramMap.get("id")) : null;

  ngOnInit(): void {
    if (!this.id) {
      this.initNewTeam();
    }
    else {
      this.getTeam();
    }
    this.getAllHeroes();
  }

  getTeam(): void {
    this.teamsService.getTeam(this.id!).subscribe((team: Team) => {
      this.team.set({ ...team });
      this.originalTeam.set({ ...team });
      this.selectedName.set(team.name);
      this.selectedColor.set(team.color);
    });
  }

  getAllHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.allHeroes.set(heroes);
      this.heroes.set(this.allHeroes().filter(hero => this.team()?.heroIds?.includes(hero.id)));
      this.availableHeroes.set([...this.allHeroes().filter(hero => hero.teamId === null), ...this.heroes()]);
    });
  }

  save(): void {
    const currentHeroes = this.heroes().map(hero => hero.id);
    this.updateHeroesTeam();
    if (!this.id) {
      this.teamsService.addTeam({
        id: this.team()!.id,
        name: this.selectedName(),
        color: this.selectedColor(),
        heroIds: currentHeroes
      });
      this.goBack();
    }
    this.teamsService.updateTeam({
      id: this.id!,
      name: this.selectedName(),
      color: this.selectedColor(),
      heroIds: currentHeroes
    });
    this.goBack();
  }

  reset(): void  {
    this.teamsService.resetTeam(this.id!);
    this.selectedName.set(this.originalTeam()!.name);
    this.selectedColor.set(this.originalTeam()!.color);
    this.heroes.set(this.allHeroes().filter(hero => this.originalTeam()?.heroIds.includes(hero.id)));
  }

  delete(): void {
    this.teamsService.deleteTeam(this.id!);
    this.goBack();
  }

  goBack(): void {
    this.visible.set(false);
  }

  updateHeroesTeam(): void {
    const oldHeroIds = this.originalTeam()?.heroIds || [];
    const currentHeroIds = this.heroes().map(hero => hero.id);
    const addedHeroIds = currentHeroIds.filter(id => !oldHeroIds.includes(id));
    const removedHeroIds = oldHeroIds.filter(id => !currentHeroIds.includes(id));

    addedHeroIds.map(id => this.heroService.updateHero({ ...this.allHeroes().find(hero => hero.id === id)!, teamId: this.id }));
    removedHeroIds.map(id => this.heroService.updateHero({ ...this.allHeroes().find(hero => hero.id === id)!, teamId: null }));
  }

  hasChanges= computed(() => {
    if (!this.originalTeam() || !this.team()) {
      return false;
    }
    const nameChanged = this.selectedName() !== this.originalTeam()?.name;
    const colorChanged = this.selectedColor() !== this.originalTeam()?.color;
    const heroesChanged = this.heroes().length !== this.originalTeam()!.heroIds.length
    || this.heroes().some(hero => !this.originalTeam()!.heroIds.includes(hero.id));
    return nameChanged || colorChanged || heroesChanged;
  });

  onNameChange(value: string): void {
    validateAlphanumeric(value, this.selectedName, this.nameErrors);
  }

  initNewTeam(): void {
    const newTeam: Team = {
      id: Date.now(),
      name: "",
      color: "#000000",
      heroIds: []
    };
    this.team.set(newTeam);
    this.selectedColor.set(newTeam.color);
    this.originalTeam.set(newTeam);
  }
}
