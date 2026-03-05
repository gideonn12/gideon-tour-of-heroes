import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero/hero';
import { ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-hero-dialog",
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    Button,
    Dialog,
    PrimeTemplate,
    CommonModule,
  ],
  providers: [HeroService],
  templateUrl: "./hero-dialog.component.html",
  styleUrls: ["./hero-dialog.component.scss"],
})
export class HeroDialogComponent implements OnInit {
  hero: WritableSignal<Hero | null> = signal<Hero | null>(null);
  visible: WritableSignal<boolean> = signal<boolean>(true);
  footerButtons: FooterButton[] = [];
  private heroService: HeroService = inject(HeroService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.initializeButtons();
    this.getHero();
  }

  initializeButtons(): void {
    this.footerButtons = [
      { label: "Delete", action: () => this.delete() },
      { label: "Reset", action: () => this.reset() },
      { label: "Save", action: () => this.save() },
      { label: "Back", action: () => this.goBack() },
    ];
  }

  getHero(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService
      .getHero(id)
      .subscribe((hero) => this.hero.set({ ...hero }));
  }

  save(): void {

  }

  reset(): void {

  }

  delete(): void {

  }

  goBack(): void {
    this.visible.set(false);
  }
}
