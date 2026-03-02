import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Location, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero/hero';
import { ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-hero-detail',
  imports: [ReactiveFormsModule, UpperCasePipe, FormsModule, Button, Card],
  providers: [HeroService],
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero: WritableSignal<Hero | null> = signal<Hero | null>(null);

  private heroService: HeroService = inject(HeroService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => this.hero.set({ ...hero }));
  }

  goBack(): void {
    this.heroService.updateHero(this.hero()!);
    this.location.back();
  }
}
