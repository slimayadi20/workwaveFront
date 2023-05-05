import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';

@Component({
  selector: 'app-Role',
  templateUrl: './Role.component.html',
  styleUrls: ['./Role.component.css']
})
export class NotificationComponent implements OnInit {
  name: string = "";
  avatarUrl: string = "";
  hovered: boolean = false;
  totalUsers = 4;
  roleName = 'Administrator';
  roles: any[] = [];
  user: any[] = [];
  data: any[] = []; 
  selectedRoleId: any;
  roleDescription: any;

  private roleUserCount: Map<string, number> = new Map();

  users: any[] = [
    { name: 'Vinnie Mostowy', avatarUrl: 'https://demos.pixinvent.com/materialize-html-admin-template/assets/img/avatars/4.png', hovered: false },
    { name: 'Allen Rieske', avatarUrl: 'https://demos.pixinvent.com/materialize-html-admin-template/assets/img/avatars/4.png', hovered: false },
    { name: 'Julee Rossignol', avatarUrl: 'https://demos.pixinvent.com/materialize-html-admin-template/assets/img/avatars/4.png', hovered: false },
    { name: 'Test User', avatarUrl: 'https://demos.pixinvent.com/materialize-html-admin-template/assets/img/avatars/4.png', hovered: false },
  ];
  constructor(public service: AuthServiceService, private cdr: ChangeDetectorRef) { }
  extraUsersTooltip = '';

  handleHover(user: any) {
    this.extraUsersTooltip = user.name;
  }
  ngOnInit(): void {
    this.getRoles();

    this.roles.forEach((role) => {
      this.roleUserCount.set(role.roleName, 0);
    });
    this.getuser();
  }
  getRoles() {
    this.service.getroles().subscribe((res: any) => {
      this.roles = res;
      this.cdr.detectChanges();
      console.log(this.roles);

    })
  }
  getRole(role: any) {
    this.service.getrole(role).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);

    })
  }
  getuser() {
    this.service.getusers().subscribe((e: any) => {
      console.log(e);
      this.data = e;

      this.roleUserCount.clear(); // clear previous counts

      this.data.forEach((user: any) => {
        user.role.forEach((role: any) => {
          const roleName = role.roleName;
          if (this.roleUserCount.has(roleName)) {
            this.roleUserCount.set(roleName, this.roleUserCount.get(roleName)! + 1);
          } else {
            this.roleUserCount.set(roleName, 1);
          }
        });
      });

      console.log(this.roleUserCount);
    });
  }


  public hasUserRole(user: any, roleName: string): boolean {
    return user.role.some((ur: any) => ur.roleName === roleName);

  }
  getUserCount(roleName: string): number {
    return this.roleUserCount.get(roleName) || 0;
  }
  update(roleId: any) {
    localStorage.setItem('id', roleId);
  }
}
