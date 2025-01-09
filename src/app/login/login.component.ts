import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  /**
   *
   */
  constructor(private userService:UserService,private router:Router) {
    
  }
  onSubmit() {
    console.log(`Username: ${this.email}, Password: ${this.password}`);
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        // استلام الـ token من الـ API واستدعاء دالة setLoginState
        const userToken = response.token;
        this.userService.setLoginState(userToken);
        console.log('Login successful!');
        this.router.navigate(['/UserList']);
        // توجيه المستخدم إلى الصفحة الرئيسية أو أي صفحة أخرى بعد تسجيل الدخول
      },
      (error) => {
        this.errorMessage = 'Invalid credentials, please try again.';
        console.error('Login failed', error);
      }
    );
  }
}
