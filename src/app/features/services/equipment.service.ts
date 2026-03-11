import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from 'rxjs';
import { Equipment } from "../models/equipment/equipment";
import { selectAllEquipments } from "../../store/equipment/selector";
import { loadEquipment, updateEquipment, resetEquipment, deleteEquipment, addEquipment } from "../../store/equipment/actions";

@Injectable()
export class EquipmentService {
  private store: Store<any> = inject(Store);

  getEquipments(): Observable<Equipment[]> {
    this.store.dispatch(loadEquipment());
    return this.store.select(selectAllEquipments);
  }

  getEquipment(id: number): Observable<Equipment> {
    return this.store.select(selectAllEquipments).pipe(map((equipments: Equipment[]) => equipments.find((equipment: Equipment) => equipment.id === id)!));
  }

  updateEquipment(equipment: Equipment): void {
    this.store.dispatch(updateEquipment({ equipment }));
  }

  deleteEquipment(id: number): void {
    this.store.dispatch(deleteEquipment({ id }));
  }

  resetEquipment(id: number): void {
    this.store.dispatch(resetEquipment({ id }));
  }

  addEquipment(equipment: Equipment): void {
    this.store.dispatch(addEquipment({ equipment }));
  }
}
