import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isLoggedIn$;
  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.userService.isLogged$;

    this.isLoggedIn$.subscribe(isLoggedIn => {
      console.log('User logged in:', isLoggedIn);
    });
  }




  logout(): void {
    this.userService.logout();
    window.location.href = '/login';
  }

}
