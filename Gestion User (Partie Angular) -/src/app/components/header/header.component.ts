import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: any;
  role: any;
  token: any;
  showTooltip: boolean = false;
  isScrolled = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userId = localStorage.getItem('id_user');
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  isStudent(): boolean {
    return this.role === 'STUDENT';
  }

  isSupervisor(): boolean {
    return this.role === 'SUPERVISOR';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  logout() {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    localStorage.removeItem('role');
    
    // Force reload to reset application state
    this.router.navigate(['/homepage']).then(() => {
      window.location.reload();
    });
  }
}