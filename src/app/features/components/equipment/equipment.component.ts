import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { Equipment } from "../../models/equipment/equipment";
import { EquipmentService } from "../../services/equipment.service";
import { Store } from "@ngrx/store";
import { loadEquipment } from "../../../store/equipment/actions";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: "app-equipment",
  imports: [UpperCasePipe],
  providers: [EquipmentService],
  templateUrl: "./equipment.component.html",
  styleUrl: "./equipment.component.scss",
})
export class EquipmentComponent implements OnInit {
  equipments: WritableSignal<Equipment[]> = signal<Equipment[]>([]);
  private store: Store<any> = inject(Store);
  private equipmentService: EquipmentService = inject(EquipmentService);

  ngOnInit(): void {
    this.store.dispatch(loadEquipment());
    this.equipmentService
      .getEquipment()
      .subscribe((equipments: Equipment[]) => this.equipments.set(equipments));
  }
}
