import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero/hero';
import { HeroService } from '../../services/hero.service';
import { appRoutes } from '../../../app/app.routes';
import { Listbox } from 'primeng/listbox';
import { PrimeTemplate } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../../store/hero/selector';
import { loadHeroes } from '../../../store/hero/actions';

@Component({
  selector: 'app-heroes',
  imports: [FormsModule, Listbox, PrimeTemplate],
  providers: [HeroService],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: WritableSignal<Hero[]> = signal<Hero[]>([]);
  private store: Store<any> = inject(Store);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
    this.store.select(selectAllHeroes).subscribe((heroes) => this.heroes.set(heroes));
  }

  onItemChange(event: any): void {
    this.router.navigate(['/', appRoutes.DETAIL, event.value]);
  }
}
