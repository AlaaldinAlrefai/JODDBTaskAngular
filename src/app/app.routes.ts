import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [


    { path: 'login', component: LoginComponent },
    { path: 'UserList', component: UserListComponent },
    { path: 'AddUser', component: AddUserComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
