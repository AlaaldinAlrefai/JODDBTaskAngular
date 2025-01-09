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
  imports: [FormsModule,SidebarComponent,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent  {
  Name: string = '';
  Email: string = '';
  MobileNumber: string = '';
  Password: string = '';
  Photo: File | null = null; // لتخزين صورة المستخدم في حال تم رفعها
  isAdding: boolean = false; // لتحديد ما إذا كان يتم إضافة المستخدم

  constructor(private userService: UserService) {}

  onSubmit() {
    const newUser = {
      Name: this.Name,
      Email: this.Email,
      MobileNumber: this.MobileNumber,
      Password: this.Password,
      Photo: this.Photo ? this.Photo.name : null // في حال تم رفع صورة
    };
    
    this.isAdding = true; // تفعيل حالة التحميل لتفعيل تعطيل الزر

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

        // أضف هنا الكود الذي يقوم بتوجيه المستخدم أو إظهار رسالة نجاح
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
        // أضف هنا الكود الذي يعرض رسالة خطأ للمستخدم
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.Photo = file; // تخزين الصورة في المتغير photo
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








  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.Photo = file; // تخزين الصورة في المتغير Photo
  //     console.log('File selected:', file.name);
  
  //     // حفظ الصورة في مجلد assets
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // إنشاء رابط للصورة
  //       const base64String = reader.result as string;
  //       const blob = this.dataURLtoBlob(base64String);
  
  //       // محاكاة حفظ الصورة في assets
  //       this.saveImageToAssets(blob, file.name);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  
  // // تحويل Base64 إلى Blob
  // dataURLtoBlob(dataURL: string): Blob {
  //   const byteString = atob(dataURL.split(',')[1]);
  //   const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ab], { type: mimeString });
  // }
  
  // // حفظ الصورة في مجلد assets
  // saveImageToAssets(blob: Blob, fileName: string): void {
  //   const filePath = `assets/${fileName}`;
  //   FileSaver.saveAs(blob, filePath);
  //   console.log(`File saved to ${filePath}`);
  // }
  

}
