import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../Services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, SidebarComponent, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  Name: string = '';
  Email: string = '';
  MobileNumber: string = '';
  Password: string = '';
  Photo: File | null = null;
  isAdding: boolean = false;

  constructor(private userService: UserService) { }

  onSubmit() {
    const newUser = {
      Name: this.Name,
      Email: this.Email,
      MobileNumber: this.MobileNumber,
      Password: this.Password,
      Photo: this.Photo ? this.Photo.name : null
    };

    this.isAdding = true;

    this.userService.AddUser(newUser).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'added successfully',
          text: 'User added successfully.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        this.isAdding = false;

        this.clearForm();

      },
      (error) => {
        this.isAdding = false;

        console.error('Error adding user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'User not added. Please try again.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.Photo = file;
      console.log('File selected:', file.name);
    }
  }

  clearForm() {
    this.Name = '';
    this.Email = '';
    this.MobileNumber = '';
    this.Password = '';
    this.Photo = null;
  }




}
