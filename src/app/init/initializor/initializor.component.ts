import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { EsIndex } from '../es-index';
import { EsTemplate } from '../es-template';
import { InitializorService } from '../initializor.service';
import { ServerState } from '../server-state';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/customer';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-initializor',
  templateUrl: './initializor.component.html',
  styleUrls: ['./initializor.component.scss']
})
export class InitializorComponent implements OnInit {

  apiState?: ServerState;
  esState?: ServerState;
  headState?: ServerState;

  userCount?: number;
  customerCount?: number;

  templatesToCheck: string[] = ['product'];
  indicesToCheck: string[]   = ['product.machines', 'product.books'];

  templates = new Map<string, EsTemplate>();
  indices   = new Map<string, EsIndex>();
  errors    = new Map<string, string>();

  constructor(
    private service: InitializorService,
    private customerService: CustomerService,
    private userService: UserService,
    private apiService: ApiService<EsTemplate, EsTemplate>
  ) {}

  ngOnInit(): void {
    this.checkServerState('api');
    this.checkServerState('es');
    this.checkServerState('head');
    this.getRecordCount('customer');
    this.getRecordCount('user');
  }

  checkServerState(type: string): void {

    // unknown type?
    const url = this.service.getStateUrl(type);
    if (!url) {
      return;
    }

    const stateVar = new ServerState(url);
    this.service.checkServerState(url)
    .pipe(
      tap(
        (res) => {
          stateVar.setOnline(true);
          stateVar.setSuccess(true);
          stateVar.setJsonResponse(JSON.stringify(res, null, 2));
        },
        (err) => {},
        () => {},
      ),
      catchError(
        (err) => {
          const online = err.status > 0 ? true : false;
          stateVar.setOnline(online);
          stateVar.setHttpStatus(err.status);
          stateVar.setErrorMsg(err.error.error);
          stateVar.setJsonResponse(JSON.stringify(err, null, 2));
          return of(stateVar);
        },
      ),
    )
    .subscribe(
      (res) => {},
      (err) => {},
      () => {
        if ('api' === type) {
          this.apiState = stateVar;
        }
        else if ('es' === type) {
          this.esState = stateVar;
        }
        else if ('head' === type) {
          this.headState = stateVar;
        }
      },
    );
  }

  fetchTemplate(name: string): void {
    this.service.getEsTemplate(name).subscribe(
      (result) => {
        if (result) {
          this.templates.set(name, result);
          this.errors.delete('template.' + name);
        }
      },
      (err) => {
        this.errors.set('template.' + name, 'Template fetching error: ' + err);
      },
    );
  }

  fetchIndex(name: string): void {
    this.service.getEsIndex(name).subscribe(
      (result) => {
        if (result) {
          this.indices.set(name, result);
          this.errors.delete('index.' + name);
        }
      },
      (err) => {
        this.errors.set('index.' + name, 'Index fetching error: ' + err);
      },
    );
  }

  getRecordCount(name: string): void {
    const url: string = this.service.getRecordCountUrl(name);
    this.service.getRecordCount(url).subscribe(
      (res) => {
        if ('user' === name) {
          this.userCount = res;
        }
        if ('customer' === name) {
          this.customerCount = res;
        }
      },
      (err) => {
        this.errors.set('count.' + name, 'Error counting ' + name + 's: ' + err);
      }
    );
  }

  /**
   * Create some random fake customers.
   */
  initCustomers(): void {
    const c: Customer = this.customerService.getEmptyCustomer();
    c.firstName = 'Charlie';
    c.lastName  = 'Taylor';
    c.email     = 'ct@gmail.com';
    c.phone     = '5727016104';
    c.street    = '123, 9th Street West';
    c.zipcode   = 31601;
    c.city      = 'Valdosta, GA';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Desiree';
    c.lastName  = 'Jenkins';
    c.email     = 'dj@gmail.com';
    c.phone     = '9902325326';
    c.street    = '16, Sherwood Drive';
    c.zipcode   = 11550;
    c.city      = 'Hempstead, NY';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Jeannie';
    c.lastName  = 'Miles';
    c.email     = 'jm@gmail.com';
    c.phone     = '496568495784';
    c.street    = '23, Ridge Street';
    c.zipcode   = 91316;
    c.city      = 'Encino, CA';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Gregory';
    c.lastName  = 'Estrada';
    c.email     = 'ge@gmail.com';
    c.phone     = '(487) 579-3554';
    c.street    = '5, Clark Street';
    c.zipcode   = 11784;
    c.city      = 'Selden, NY';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Priscilla';
    c.lastName  = 'King';
    c.email     = 'pk@gmail.com';
    c.phone     = '(985) 226-5507';
    c.street    = '5a, Maple Street';
    c.zipcode   = 10954;
    c.city      = 'Nanuet, NY';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Beverly';
    c.lastName  = 'Brooks';
    c.email     = 'bb@gmail.com';
    c.phone     = '(554) 992-8019';
    c.street    = '23, Park Place';
    c.zipcode   = 6511;
    c.city      = 'New Haven, CT';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Nicole';
    c.lastName  = 'Vargas';
    c.email     = 'nv@gmail.com';
    c.phone     = '(510) 992-4507';
    c.street    = '65, Park Place';
    c.zipcode   = 43110;
    c.city      = 'Canal Winchester, OH';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Donna';
    c.lastName  = 'Fields';
    c.email     = 'df@gmail.com';
    c.phone     = '(559) 439-7323';
    c.street    = '46, Main Street';
    c.zipcode   = 15401;
    c.city      = 'Uniontown, PA';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Elizabeth';
    c.lastName  = 'Barber';
    c.email     = 'eb@gmail.com';
    c.phone     = '346 - 6022192';
    c.street    = '76, Monroe Drive';
    c.zipcode   = 37160;
    c.city      = 'Shelbyville, TN';
    this.customerService.saveCustomer(c).subscribe();
    c.firstName = 'Fredrick';
    c.lastName  = 'Bell';
    c.email     = 'fb@gmail.com';
    c.phone     = '(672) 696-8023';
    c.street    = '2, Willow Lane';
    c.zipcode   = 11550;
    c.city      = 'Hempstead, NY';
    this.customerService.saveCustomer(c).subscribe();
  }

  /**
   * Create some random fake users.
   */
  initUsers(): void {
    const u: User = this.userService.getEmptyUser();
    u.userName = 'ccurry';
    u.realName = 'Courtney Curry';
    u.email    = 'ccurry@example.com';
    u.active   = true;
    this.userService.saveUser(u).subscribe();
    u.userName = 'cyoung';
    u.realName = 'Cecelia Young';
    u.email    = 'cyoung@example.com';
    u.active   = false;
    this.userService.saveUser(u).subscribe();
    u.userName = 'wwade';
    u.realName = 'Wilfred Wade';
    u.email    = 'wwade@example.com';
    u.active   = true;
    this.userService.saveUser(u).subscribe();
    u.userName = 'gortega';
    u.realName = 'Glen Ortega';
    u.email    = 'gortega@example.com';
    u.active   = false;
    this.userService.saveUser(u).subscribe();
    u.userName = 'adouglas';
    u.realName = 'Angel Douglas';
    u.email    = 'adouglas@example.com';
    u.active   = true;
    this.userService.saveUser(u).subscribe();
    u.userName = 'apittman';
    u.realName = 'Anita Pittman';
    u.email    = 'apittman@example.com';
    u.active   = false;
    this.userService.saveUser(u).subscribe();
    u.userName = 'scook';
    u.realName = 'Sylvester Cook';
    u.email    = 'scook@example.com';
    u.active   = false;
    this.userService.saveUser(u).subscribe();
  }
}
