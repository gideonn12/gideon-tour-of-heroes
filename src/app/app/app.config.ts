import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from '../features/services/message.service';
import { provideStore } from '@ngrx/store';
import { heroReducer } from '../store/hero/reducer';
import { provideEffects } from '@ngrx/effects';
import { HeroEffects } from '../store/hero/effects';
import { TeamsEffects } from '../store/teams/effects';
// import { EquipmentEffects } from '../store/equipment/effects';
import { teamsReducer } from '../store/teams/reducer';
// import { equipmentReducer } from '../store/equipment/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MessageService,
    provideStore({
      hero: heroReducer,
      teams: teamsReducer,
      // equipments: equipmentReducer,
    }),
    provideEffects(HeroEffects, TeamsEffects),
  ],
};
