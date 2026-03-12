import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Equipment } from '../../models/equipment/equipment';
import { EquipmentService } from '../../services/equipment.service';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { validateAlphanumeric } from '../../utils/validator';

@Component({
  selector: "app-equipment-dialog",
  imports: [
    Dialog,
    Button,
    PrimeTemplate,
    UpperCasePipe,
    FormsModule
  ],
  providers: [EquipmentService],
  templateUrl: "./equipment-dialog.component.html",
  styleUrl: "./equipment-dialog.component.scss",
})
export class EquipmentDialogComponent implements OnInit {
  visible = signal(true);
  equipment = signal<Equipment | null>(null);
  originalEquipment = signal<Equipment | null>(null);
  selectedType = signal<string>("");
  selectedIcon = signal<string>("");
  selectedWeight = signal<number>(0);
  nameErrors = signal<string[]>([]);
  footerButtons: FooterButton[] = [
    { label: "Delete", action: () => this.delete() },
    { label: "Reset", action: () => this.reset() , disabled: () => !this.hasChanges() },
    { label: "Save", action: () => this.save() , disabled: () => !this.hasChanges() },
    { label: "Back", action: () => this.goBack() }];
  private equipmentService: EquipmentService = inject(EquipmentService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private id: number | null = this.route.snapshot.paramMap.get("id")? Number(this.route.snapshot.paramMap.get("id")) : null;
  private equipmentLength: number = 0;

  ngOnInit(): void {
    if (!this.id) {
      this.initNewEquipment();
    }
    else {
      this.getEquipment();
    }
  }

  getEquipment(): void {
    this.equipmentService.getEquipment(this.id!).subscribe((equipment: Equipment) => {
      this.equipment.set(equipment);
      this.originalEquipment.set(equipment);
      this.selectedType.set(equipment.type);
      this.selectedIcon.set(equipment.icon);
      this.selectedWeight.set(equipment.weight);
    });
  }

  save(): void {
    const equipment = {
      id: this.equipment()!.id,
      type: this.selectedType(),
      icon: this.selectedIcon(),
      weight: this.selectedWeight()
    }
    if (!this.id) {
      this.equipmentService.addEquipment(equipment);
      this.goBack();
      return;
    }
    this.equipmentService.updateEquipment(equipment);
      this.goBack();
  }

  reset(): void {
    this.equipmentService.resetEquipment(this.id!);
    this.selectedType.set(this.originalEquipment()!.type);
    this.selectedIcon.set(this.originalEquipment()!.icon);
    this.selectedWeight.set(this.originalEquipment()!.weight);
  }

  delete(): void {
    this.equipmentService.deleteEquipment(this.id!);
    this.goBack();
  }

  goBack(): void {
    this.visible.set(false);
  }

  hasChanges = computed(() => {
    const typeChanged = this.selectedType() !== this.originalEquipment()?.type;
    const iconChanged = this.selectedIcon() !== this.originalEquipment()?.icon;
    const weightChanged = this.selectedWeight() !== this.originalEquipment()?.weight;
    return typeChanged || iconChanged || weightChanged;
  });

  onTypeChange(value: string): void {
    validateAlphanumeric(value, this.selectedType, this.nameErrors);
  }

  initNewEquipment(): void {
    this.equipmentService.getEquipments().subscribe((equipments: Equipment[]) => {
      this.equipmentLength = equipments.length;
    });
    const newEquipment: Equipment = {
      id: this.equipmentLength +1,
      type: "",
      icon: "",
      weight: 0
    };
    this.equipment.set({ ...newEquipment });
    this.originalEquipment.set({ ...newEquipment });
    this.visible.set(true);
  }
}
