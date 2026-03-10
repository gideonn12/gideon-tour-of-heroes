import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Equipment } from "../models/equipment/equipment";
import { selectAllEquipments } from "../../store/equipment/selector";
import { loadEquipment } from "../../store/equipment/actions";

@Injectable()
export class EquipmentService {
  private store: Store<any> = inject(Store);

  getEquipments(): Observable<Equipment[]> {
    this.store.dispatch(loadEquipment());
    return this.store.select(selectAllEquipments);
  }
}
