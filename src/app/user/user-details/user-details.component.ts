import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  isReady       = false;
  idFormatError = false;
  saveError     = false;
  fetchError    = false;
  exists        = false;
  user: User    = this.service.getEmptyUser();

  constructor(private route: ActivatedRoute, private service: UserService) {}

  ngOnInit(): void {
    const id: string|null = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (+id) {
        this.exists = true;
        this.service.getUser(+id).subscribe(
          (user) => {
            this.user       = user;
            this.fetchError = false;
            this.isReady    = true;
          },
          (err) => {
            this.fetchError = true;
            this.isReady    = true;
          },
        );
      }
      else if ('new' === id) {
        this.isReady = true;
      }
      else {
        this.idFormatError = true;
        this.isReady       = true;
      }
    }
  }

  save(): void {
    this.isReady = false;
    this.service.saveUser(this.user).subscribe(
      (user) => {
        this.user      = user;
        this.exists    = true;
        this.saveError = false;
        this.isReady   = true;
      },
      (err) => {
        this.saveError = true;
        this.isReady   = true;
      },
    );
  }

}
