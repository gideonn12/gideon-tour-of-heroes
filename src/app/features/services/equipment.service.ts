import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Equipment } from "../models/equipment/equipment";
import { selectAllEquipments } from "../../store/equipment/selector";

@Injectable()
export class EquipmentService {
  private store: Store<any> = inject(Store);

  getEquipment(): Observable<Equipment[]> {
    return this.store.select(selectAllEquipments);
  }
}
