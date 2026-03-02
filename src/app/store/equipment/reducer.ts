import { Equipment } from "../../features/models/equipment/equipment";
import { createReducer, on } from "@ngrx/store";
import { loadEquipment } from "./actions";

export interface EquipmentState {
  equipments: Equipment[];
}

export const initialEquipmentState: EquipmentState = {
  equipments: [
    {
      id: 1,
      type: "sword",
      icon: "⚔️",
      weight: 2.5,
    },
    {
      id: 2,
      type: "shield",
      icon: "🛡️",
      weight: 5.0,
    },
    {
      id: 3,
      type: "cape",
      icon: "🧥",
      weight: 1.0,
    },
    {
      id: 4,
      type: "bow",
      icon: "🏹",
      weight: 1.5,
    },
    {
      id: 5,
      type: "helmet",
      icon: "⛑️",
      weight: 3.0,
    },
    {
      id: 6,
      type: "boots",
      icon: "🥾",
      weight: 2.0,
    },
  ],
};

export const equipmentReducer = createReducer(
  initialEquipmentState,
  on(loadEquipment, (state) => ({
    ...state,
    equipments: [...state.equipments]
  })),
);
