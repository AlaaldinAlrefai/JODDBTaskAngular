import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';

export const routes: Routes = [


    { path: 'login', component: LoginComponent },
    { path: 'UserList', component: UserListComponent },
    { path: 'AddUser', component: AddUserComponent },
    { path: 'ImportExcel', component: ImportExcelComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
