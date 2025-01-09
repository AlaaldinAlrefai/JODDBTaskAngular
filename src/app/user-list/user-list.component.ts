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

/**
 *
 */
constructor(private userService:UserService, private cdRef: ChangeDetectorRef) {
  
  
}
  ngOnInit(): void {
    // this.userService.getAllUsers().subscribe(
    //   result => 
    //     {this.userList=result;
    //       console.log("User List:", this.userList);
    //       console.log("userList.photo: "+this.userList.photo);
    //     }
    // )
  
    this.loadUsers();


  }


  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(response => {
      this.userList = response.items;  // assuming 'items' contains the users
      this.totalPages = response.totalPages;  // assuming 'totalPages' contains the total pages count
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
            // إظهار رسالة نجاح
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'User has been deleted successfully.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
  
            // تحديث قائمة المستخدمين
            this.refreshUserList();
          },
          error => {
            console.error('Error deleting user', error);
  
            // إظهار رسالة خطأ
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
    this.refreshUserList(); // إعادة تحميل القائمة بعد التحديث
  }
  
  
  refreshUserList(): void {
    this.isLoading = true; // عرض حالة التحميل أثناء التحديث
    this.userService.getAllUsers().subscribe(
      result => {
        this.userList = result;
        this.isLoading = false; // إخفاء حالة التحميل بعد التحديث
      },
      error => {
        console.error('Error refreshing user list:', error);
        this.isLoading = false; // إخفاء حالة التحميل إذا حدث خطأ
      }
    );
  }
  
  
  

  isPopupOpen = false; // لتحديد إذا كانت النافذة المنبثقة مفتوحة
  selectedUser: IUpdateUser | null = null;

  openUpdatePopup(userId: number) {
    console.log('Fetching user with ID:', userId);
    this.userService.getUserById(userId).subscribe(
      (user) => {
        console.log('User fetched:', user);
        


        // تحقق من أن جميع الحقول المطلوبة موجودة وصحيحة
        if (user && user.id && user.name && user.email && user.mobileNumber) {
          this.selectedUser = user;
          this.isPopupOpen = true;  // فتح النافذة بعد التأكد من أن selectedUser يحتوي على بيانات صحيحة
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
    // this.selectedUser = null;  // أو أي إجراء آخر لإعادة تعيين selectedUser بعد الإغلاق

  }
  


  importExcel(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file: File | null = input.files ? input.files[0] : null;
  
    if (file) {
      this.isLoading = true;  // تعيين حالة التحميل إلى true قبل البدء في الرفع

      this.userService.
      importExcel(file).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);  // تأكد من استخدام `response.body` هنا
          this.isLoading = false;  // تعيين حالة التحميل إلى false بعد انتهاء الرفع
          Swal.fire({
            icon: 'success',
            title: 'Upload Successful!',
            text: 'Your file has been uploaded successfully.',
            toast: true,           // جعل التنبيه يشبه الـ toaster
            position: 'top-end',   // تحديد مكان التنبيه
            showConfirmButton: false,  // إخفاء زر التأكيد
            timer: 3000,           // مدة عرض التنبيه (بالميلي ثانية)
          });

        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.isLoading = false;  // تعيين حالة التحميل إلى false في حال حدوث خطأ
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed!',
            text: 'There was an error uploading the file. Please try again.',
            toast: true,           // جعل التنبيه يشبه الـ toaster
            position: 'top-end',   // تحديد مكان التنبيه
            showConfirmButton: false,  // إخفاء زر التأكيد
            timer: 3000,           // مدة عرض التنبيه (بالميلي ثانية)
          });
  
        }
      });
    } else {
      console.log('No file selected');
       
    }
  }
  
  

}
