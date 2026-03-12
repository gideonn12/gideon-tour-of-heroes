import { Equipment } from "../../features/models/equipment/equipment";
import { createReducer, on } from "@ngrx/store";
import { addEquipment, deleteEquipment, loadEquipment, resetEquipment, updateEquipment } from './actions';
import { INITIAL_EQUIPMENT } from "../../features/mocks/mock-equipment";

export interface EquipmentState {
  equipments: Equipment[];
}

export const initialEquipmentState: EquipmentState = {
  equipments: INITIAL_EQUIPMENT,
};

export const equipmentReducer = createReducer(
  initialEquipmentState,

  on(loadEquipment, (state: EquipmentState): { equipments: Equipment[] } => ({
    ...state,
    equipments: [...state.equipments]
  })),

  on(addEquipment, (state: EquipmentState, { equipment }: { equipment: Equipment }) => ({
    ...state,
    equipments: [...state.equipments, equipment]
  })),

  on(updateEquipment, (state: EquipmentState, { equipment }: { equipment: Equipment }) => ({
    ...state,
    equipments: state.equipments.map((e: Equipment) => (e.id === equipment.id ? equipment : e))
  })),

  on(deleteEquipment, (state: EquipmentState, { id }: { id: number }) => ({
    ...state,
    equipments: state.equipments.filter((equipment: Equipment) => equipment.id !== id)
  })),

  on(resetEquipment, (state: EquipmentState, {id}: { id: number }): EquipmentState => {
    const originalEquipment: Equipment | undefined = initialEquipmentState.equipments.find((e: Equipment) => e.id === id);
    if (!originalEquipment) {
      return state;
    }
    return {
      ...state,
      equipments: state.equipments.map((equipment: Equipment) => (equipment.id === id ? originalEquipment : equipment)),
    };
  }),
);
