import { Component } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PIDV';
  constructor(private pushService: PushNotificationService) {}

  ngOnInit(): void {
    this.pushService.subscribeToNotifications();
  }
}
