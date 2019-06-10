import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  authSubscription: Subscription;

  @Output() 
  sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    });
  }

  // Clears up unneeded memory when we no longer need the subscription
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
