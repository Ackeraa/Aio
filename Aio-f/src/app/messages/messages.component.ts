import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService, SearchParams } from '../shared';
import { MessagesService } from './';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  @Input() which: string;
  loading: boolean;
  messages: any;
  total: number;
  p: number;
  user: any;

  constructor(
    private messagesService: MessagesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.messagesService.getUser().subscribe({
      next: user => (this.user = user),
    });

      this.getMessages(this.messagesService.getMessagesPage());
  }

  getMessages(params: SearchParams): void {
    this.loading = true;
    this.p = params.page;
    this.messagesService
      .getMessages('/messages/search', params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.messages = data.messages;
          this.total = data.total;
        },
        error: err => {
          this.alertService.error(err);
        },
      });
  }
}

