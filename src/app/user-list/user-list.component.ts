import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IUser } from '../Models/i-user';
import { FormsModule } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { IUpdateUser } from '../Models/i-update-user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,
    SidebarComponent,
    FormsModule,
    UpdateUserComponent,

  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  isLoading: boolean = false;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;


  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) {


  }
  ngOnInit(): void {


    this.loadUsers();


  }


  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(response => {
      this.userList = response.items;
      this.totalPages = response.totalPages;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }



  delete(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'User has been deleted successfully.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

            this.refreshUserList();
          },
          error => {
            console.error('Error deleting user', error);

            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the user. Please try again later.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
          }
        );
      }
    });
  }

  onUserUpdated() {
    this.refreshUserList();
  }


  refreshUserList(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe(
      result => {
        this.userList = result;
        this.isLoading = false;
      },
      error => {
        console.error('Error refreshing user list:', error);
        this.isLoading = false;
      }
    );
  }




  isPopupOpen = false;
  selectedUser: IUpdateUser | null = null;

  openUpdatePopup(userId: number) {
    console.log('Fetching user with ID:', userId);
    this.userService.getUserById(userId).subscribe(
      (user) => {
        console.log('User fetched:', user);



        if (user && user.id && user.name && user.email && user.mobileNumber) {
          this.selectedUser = user;
          this.isPopupOpen = true;
          console.log('Selected User to pass to popup:', this.selectedUser);
          console.log('Checking user fields:');
          console.log('ID:', user.id);
          console.log('Name:', user.name);
          console.log('Email:', user.email);
          console.log('Mobile:', user.mobileNumber);
          if (!user.id || !user.name || !user.email || !user.mobileNumber) {
            console.error('Invalid field found');
          }

        } else {
          console.error('User data is invalid', user);
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }






  closePopup() {
    this.isPopupOpen = false;

  }



  importExcel(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file: File | null = input.files ? input.files[0] : null;

    if (file) {
      this.isLoading = true;
      this.userService.
        importExcel(file).subscribe({
          next: (response) => {
            console.log('File uploaded successfully:', response);
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Upload Successful!',
              text: 'Your file has been uploaded successfully.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

          },
          error: (error) => {
            console.error('Upload failed:', error);
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Upload Failed!',
              text: 'There was an error uploading the file. Please try again.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

          }
        });
    } else {
      console.log('No file selected');

    }
  }



}
