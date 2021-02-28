import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserFilter } from './user-filter';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  filter: UserFilter;
  isWaiting = false;
  hasError  = false;
  error     = 'unknown error';
  users: User[] = [];

  constructor(private service: UserService) {
    this.filter = new UserFilter();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.isWaiting = true;
    this.hasError = false;
    this.service.searchUsers(this.filter).subscribe(
      (users) => {
        this.users     = users;
        this.isWaiting = false;
        this.hasError  = false;
      },
      (err) => {
        this.isWaiting = false;
        this.hasError  = true;
      },
    );
  }

  filterChanged(): void {
    for (const field in this.filter) {
      if ('id' === field || 'userName' === field || 'realName' === field || 'email' === field) {
        if ('' === this.filter[field]) {
          this.filter[field] = undefined;
        }
      }
      else if ('lastLoginMin' === field || 'lastLoginMax' === field) {
        if (!this.filter[field]) {
          this.filter[field] = undefined;
        }
      }
    }
  }

  isLastLoginFilterSet(type: string): boolean {
    if ('min' === type) {
      if (undefined === this.filter.lastLoginMin) { return false; }
      if (!this.filter.lastLoginMin.toString())   { return false; }
      return true;
    }
    else if ('max' === type) {
      if (undefined === this.filter.lastLoginMax) { return false; }
      if (!this.filter.lastLoginMax.toString())   { return false; }
      return true;
    }
    else {
      throw new Error('invalid last login type');
    }
  }
}
