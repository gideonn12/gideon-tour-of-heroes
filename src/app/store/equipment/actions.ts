import { createAction, props } from '@ngrx/store';
import { Equipment } from '../../features/models/equipment/equipment';

export const loadEquipment = createAction('[Equipment] Load Equipment');

export const updateEquipment = createAction('[Equipment] Update Equipment', props<{ equipment: Equipment }>());

export const deleteEquipment = createAction('[id] Delete Equipment', props<{ id: number }>());

export const resetEquipment = createAction('[id] Reset Equipment', props<{ id: number }>());

export const addEquipment = createAction('[Equipment] Add Equipment', props<{ equipment: Equipment }>());