import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';

@Component({
  selector: 'app-displayusers',
  templateUrl: './displayusers.component.html',
  styleUrls: ['./displayusers.component.css']
})
export class DisplayusersComponent implements OnInit {

  constructor(public service: AuthServiceService, private router: Router) { }
  data: any = [];
  roles: any = [];
  term: any;
  page: number = 0;
  pages: Array<number> | undefined;
  selectedRole: string = '';

  
  ngOnInit(): void {
    this.afficher();
    this.afficherRole();
  }
  
  filterByRole(role: string) {
    this.selectedRole = role;
    this.page = 0; // reset page to 0 when changing filters
    this.afficher();
  }
  getuser() {
    this.service.getusers().subscribe((e: any) => {
      console.log(e);
      this.data = e
    });
  }
  forwardtodetail(id: any) {
    this.router.navigate(
      ['/users/detailusers/'],
      { queryParams: { userName: id } }
    );
  }
  ban(etat: any, user: any) {
    this.service.ban({ userName: user, ban: etat }).subscribe((e: any) => {
      console.log(e);
      this.getuser();
    })

  }
  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.afficher();

  }
  afficher() {
    this.service.PaginationUsers(this.page, this.selectedRole).toPromise().then((data: any) => {
      this.data = data['content'];
      this.pages = new Array(data['totalPages']);
    }).catch((err) => {
      console.log("erreur a afficher les utilisateurs");
    })
  }
  
  afficherRole() {
    this.service.getroles().toPromise().then((data: any) => {
      this.roles = data;
      console.log(this.roles)
    }).catch((err) => {
      console.log("erreur a afficher les utilisateurs");
    })
  }
}
