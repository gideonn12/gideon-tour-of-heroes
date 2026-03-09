import {
  Component,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { Equipment } from "../../models/equipment/equipment";
import { EquipmentService } from "../../services/equipment.service";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: "app-equipment",
  imports: [UpperCasePipe],
  providers: [EquipmentService],
  templateUrl: "./equipment.component.html",
  styleUrl: "./equipment.component.scss",
})
export class EquipmentComponent implements OnInit {
  equipments = signal<Equipment[]>([]);
  private equipmentService: EquipmentService = inject(EquipmentService);

  ngOnInit(): void {
    this.equipmentService.getEquipment().subscribe((equipments: Equipment[]) => this.equipments.set(equipments));
  }
}
