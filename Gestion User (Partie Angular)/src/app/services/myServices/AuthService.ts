import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Dummy method for illustration. Replace with actual logic.
  isAuthenticated(): boolean {
    // Implement actual logic to check if the user is authenticated
    return !!localStorage.getItem('token');
  }
}
