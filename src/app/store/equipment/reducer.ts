import { Equipment } from "../../features/models/equipment/equipment";
import { createReducer, on } from "@ngrx/store";
import { loadEquipment } from "./actions";
import { INITIAL_EQUIPMENT } from "./mock-equipment";

export interface EquipmentState {
  equipments: Equipment[];
}

export const initialEquipmentState: EquipmentState = {
  equipments: INITIAL_EQUIPMENT,
};

export const equipmentReducer = createReducer(
  initialEquipmentState,
  on(loadEquipment, (state) => ({
    ...state,
    equipments: [...state.equipments]
  })),
);
