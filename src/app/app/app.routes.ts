import { Routes } from '@angular/router';
import { HeroesComponent } from '../features/components/heroes/heroes.component';
import { DashboardComponent } from '../features/components/dashboard/dashboard.component';
import { HeroDetailComponent } from '../features/components/hero-detail/hero-detail.component';
import { TeamsComponent } from '../features/components/teams/teams.component';
// import { EquipmentComponent } from '../features/components/equipment/equipment.component';

export enum appRoutes {
  HEROES = 'heroes',
  DASHBOARD = 'dashboard',
  DETAIL = 'detail',
  TEAMS = 'teams',
  EQUIPMENT = 'equipment',
}

export const routes: Routes = [
  { path: appRoutes.HEROES, component: HeroesComponent, title: 'Heroes' },
  { path: appRoutes.DASHBOARD, component: DashboardComponent, title: 'Dashboard' },
  { path: '', redirectTo: appRoutes.DASHBOARD, pathMatch: 'full' },
  { path: `${appRoutes.DETAIL}/:id`, component: HeroDetailComponent },
  { path: appRoutes.TEAMS, component: TeamsComponent, title: 'Teams' },
  // { path: appRoutes.EQUIPMENT, component: EquipmentComponent, title: 'Equipment' },
];
