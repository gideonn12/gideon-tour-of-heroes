import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [Button, Card],
})
export class MessagesComponent implements OnInit {
  messageService: MessageService = inject(MessageService);
  messages: string[] = this.messageService.messages;

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe((messages: string[]) => (this.messages = messages));
  }

  clearMessages(): void {
    this.messageService.clear();
    this.messages = [];
    this.getMessages();
  }
}
