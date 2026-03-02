import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EquipmentState } from "./reducer";

export const selectEquipmentState = createFeatureSelector<EquipmentState>('equipment');

export const selectAllEquipments = createSelector(
  selectEquipmentState,
  (state: EquipmentState) => state.equipments
);
