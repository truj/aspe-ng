import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';
import { User } from './user';
import { UserFilter } from './user-search/user-filter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService<User, User>, private apiServiceSearch: ApiService<User[], UserFilter>) {}

  public getEmptyUser(): User {
    return {
      userName: '',
      realName: '',
      email: '',
    };
  }

  saveUser(user: User): Observable<User> {
    if (user.id) {
      return this.apiService.put('/user/update/' + user.id, user);
    }
    else {
      return this.apiService.post('/user/create', user);
    }
  }

  getUser(id: number): Observable<User> {
    return this.apiService.get('/user/' + id);
  }

  searchUsers(filter: UserFilter): Observable<User[]> {
    return this.apiServiceSearch.post('/user/search', filter);
  }
}
