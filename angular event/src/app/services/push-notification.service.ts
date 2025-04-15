import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY = '🔑 TA_CLÉ_PUBLIQUE_Ici'; // remplace par ta vraie clé

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications() {
    if (!this.swPush.isEnabled) {
      console.warn('Service Worker non activé.');
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY,
    }).then(subscription => {
      // Envoie au backend
      this.http.post('http://localhost:3000/api/subscribe', subscription).subscribe(
        () => console.log('🔔 Abonnement envoyé au serveur !'),
        err => console.error('Échec d\'envoi d\'abonnement :', err)
      );
    }).catch(err => console.error('Échec d\'abonnement:', err));
  }
}