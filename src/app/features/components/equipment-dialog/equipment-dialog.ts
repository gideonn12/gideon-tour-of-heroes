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
  templateUrl: "./equipment-dialog.html",
  styleUrl: "./equipment-dialog.scss",
})
export class EquipmentDialog implements OnInit {
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
  private id: number = Number(this.route.snapshot.paramMap.get("id"));

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment(): void {
    this.equipmentService.getEquipment(this.id).subscribe((equipment: Equipment) => {
      this.equipment.set(equipment);
      this.originalEquipment.set(equipment);
      this.selectedType.set(equipment.type);
      this.selectedIcon.set(equipment.icon);
      this.selectedWeight.set(equipment.weight);
    });
  }

  save(): void {
    this.equipmentService.updateEquipment({
      id: this.id,
      type: this.selectedType(),
      icon: this.selectedIcon(),
      weight: this.selectedWeight()
    });
      this.goBack();
  }

  reset(): void {
    this.equipmentService.resetEquipment(this.id);
  }

  delete(): void {
    this.equipmentService.deleteEquipment(this.id);
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

  onTypeChange(value: string) {
    validateAlphanumeric(value, this.selectedType, this.nameErrors);
  }
}
