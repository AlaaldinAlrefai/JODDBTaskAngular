import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { IUser } from '../Models/i-user';
import { IUpdateUser } from '../Models/i-update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();
  httpOptions;
  


  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('authToken');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };

    // this.checkLoginStatus(); // التحقق من حالة الدخول عند بدء التطبيق

    this.isLoggedSubject.next(true);

  }


  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };

    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/Users`,httpOptions)
      .pipe(
        retry(2),
        catchError((err) => {
          console.error('Error details:', err);
          return throwError(() => new Error('API Error: ' + err))
        }));
  }


  ///////
  getUsers(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get<any>(`${environment.apiUrl}/api/Users`, { params, headers: httpOptions.headers });
  }


  login(email: string, password: string): Observable<any> {
    // إعداد بيانات الطلب
    const loginData = { email, password };

    // إرسال الطلب إلى الـ API
    return this.httpClient.post<any>(`${environment.apiUrl}/api/Users/login`, loginData)
      .pipe(
        retry(2), // إعادة المحاولة مرتين في حال حدوث خطأ
        catchError(err => {
          // التعامل مع الأخطاء
          console.error('Login error', err);
          throw err;
        })
      );
  }

  // دالة لتخزين الـ token وتحديث حالة الدخول
  setLoginState(userToken: string): void {
    localStorage.setItem("token", userToken);
    this.isLoggedSubject.next(true);
  }

  // // دالة للتحقق من حالة تسجيل الدخول
  // checkLoginStatus(): boolean {
  //   return !!localStorage.getItem("token");
  // }

  logout(): void {
    localStorage.removeItem("token");
    this.isLoggedSubject.next(false);
  }



  AddUser(newUser: IUser): Observable<IUser> {
    const token = localStorage.getItem('token');  // استرجاع الـ Token من localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // إضافة الـ Token إلى الهيدر
      'Content-Type': 'application/json'   // تحديد نوع المحتوى
    });
    return this.httpClient.post<IUser>(`${environment.apiUrl}/api/Users`, JSON.stringify(newUser), { headers })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error('Error details:', err);
          return throwError(() => new Error('API Error: ' + err));
        })
      );
  }

  updateUser(userId: number, updatedUser: IUpdateUser): Observable<IUpdateUser> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    if (!userId) {
      throw new Error('Invalid user ID');
    }
    // إرسال طلب PUT لتحديث بيانات المستخدم
    return this.httpClient.put<IUpdateUser>(`${environment.apiUrl}/api/Users/${userId}`, JSON.stringify(updatedUser), { headers })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error('Error details:', err);
          return throwError(() => new Error('API Error: ' + err));
        })
      );
  }
  

  deleteUser(userId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // إرسال طلب DELETE لحذف المستخدم
    return this.httpClient.delete<void>(`${environment.apiUrl}/api/Users`, {
      headers,
      params: { id: userId.toString() }
    })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error('Error details:', err);
          return throwError(() => new Error('API Error: ' + err));
        })
      );
  }

  
  getUserById(userId: number): Observable<IUpdateUser> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // إرسال طلب GET للحصول على بيانات المستخدم
    return this.httpClient.get<IUpdateUser>(`${environment.apiUrl}/api/Users/${userId}`, { headers })
      .pipe(
        retry(2), // إعادة المحاولة مرتين في حال حدوث خطأ
        catchError((err) => {
          console.error('Error details:', err);
          return throwError(() => new Error('API Error: ' + err));
        })
      );
  }
  


  importExcel(file: File): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    const formData = new FormData();
    formData.append('file', file);
  
    return this.httpClient.post<string>(
      `${environment.apiUrl}/api/Users/import`,
      formData,
      { headers, responseType: 'text' as 'json' }
    );
  }
  






  }


