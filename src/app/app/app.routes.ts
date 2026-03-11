import { Routes } from '@angular/router';
import { HeroesComponent } from '../features/components/heroes/heroes.component';
import { DashboardComponent } from '../features/components/dashboard/dashboard.component';
import { HeroDialogComponent } from '../features/components/hero-dialog/hero-dialog.component';
import { TeamsComponent } from '../features/components/teams/teams.component';
import { EquipmentComponent } from '../features/components/equipment/equipment.component';
import { TeamsDialog } from '../features/components/teams-dialog/teams-dialog';
import { EquipmentDialog } from '../features/components/equipment-dialog/equipment-dialog';

export enum appRoutes {
  HEROES = 'heroes',
  DASHBOARD = 'dashboard',
  HERO_DIALOG = 'detail',
  TEAMS = 'teams',
  EQUIPMENT = 'equipment',
  TEAM_DIALOG = 'team-dialog',
  EQUIPMENT_DIALOG = 'equipment-dialog',
}

export const routes: Routes = [
  { path: appRoutes.HEROES, component: HeroesComponent, title: 'Heroes' },
  { path: appRoutes.DASHBOARD, component: DashboardComponent, title: 'Dashboard' },
  { path: '', redirectTo: appRoutes.DASHBOARD, pathMatch: 'full' },
  { path: `${appRoutes.HERO_DIALOG}/:id`, component: HeroDialogComponent },
  { path: appRoutes.TEAMS, component: TeamsComponent, title: 'Teams' },
  { path: appRoutes.EQUIPMENT, component: EquipmentComponent, title: 'Equipment' },
  { path: `${appRoutes.TEAM_DIALOG}/:id`, component: TeamsDialog },
  { path: `${appRoutes.EQUIPMENT_DIALOG}/:id`, component: EquipmentDialog },
  { path: appRoutes.HERO_DIALOG, component: HeroDialogComponent }
];
