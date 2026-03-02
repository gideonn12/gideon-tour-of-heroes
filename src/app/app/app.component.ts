import { Component } from '@angular/core';
import { MessagesComponent } from '../features/components/messages/messages.component';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';
import { routes } from './app.routes';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [MessagesComponent, RouterOutlet, RouterLink, Button],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly displayRoutes: Routes = routes;
  title: string = 'Tour Of Heroes';
}
