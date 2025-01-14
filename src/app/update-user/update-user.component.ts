import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUpdateUser } from '../Models/i-update-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnChanges {
  @Input() selectedUser!: IUpdateUser;
  @Output() close = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && this.selectedUser) {
      console.log('Selected User updated:', this.selectedUser);
    }
  }

  ngOnInit() {
    console.log('Selected User on Init:', this.selectedUser);
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    console.log('Selected User on Submit:', this.selectedUser);

    if (this.selectedUser) {
      console.log('Selected User on Submit:', this.selectedUser.id);
      if (this.selectedUser.id) {
        this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
          (updatedUser) => {
            console.log('User updated successfully:', updatedUser);

            Swal.fire({
              icon: 'success',
              title: 'Update Successful!',
              text: 'User updated successfully',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

            this.userUpdated.emit();
            this.closePopup();
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        console.error('Invalid user ID');
      }
    } else {
      console.error('No selected user');
    }
  }



}
