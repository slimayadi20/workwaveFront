import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit, OnChanges {
  roleForm: FormGroup = new FormGroup({
    roleName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    roleDescription: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),

  })

  @Input() roleId: any;
  @Input() roleDescription: any;
  test: boolean = false;
  dropdownList: any;
  selectedUsers: any = {};
  users: any;
  selectedItems2: any;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'userName',
    textField: 'nom',
    itemsShowLimit: 3,
    enableCheckAll: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  constructor(private service: AuthServiceService) { }

  ngOnInit(): void {
    this.getusers();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['roleId'].currentValue != 0) {
      this.roleForm.get("roleName")!.setValue(changes['roleId'].currentValue);
      this.roleForm.get("roleDescription")!.setValue(changes['roleDescription'].currentValue);
      this.getUserByRole();
    }
    if (changes['roleId'].currentValue == 0) {
      this.getusers();
      this.roleForm.get("roleName")!.setValue("");
      this.roleForm.get("roleDescription")!.setValue("");
    }
  }
  getUserByRole() {
    this.service.getrole(this.roleId).subscribe((e: any) => {
      this.users = e;
      this.selectedItems2 = this.users.map((user: any) => {
        return { userName: user.userName, nom: user.userName };
      });
    });
  }
  getusers() {
    this.service.getusers().subscribe((users: any) => {
      this.dropdownList = users.map((user: any) => {
        return { userName: user.userName, nom: user.userName };
      });
    });
  }
  createRole() {
    this.service.createRole(this.roleForm.value).subscribe((res: any) => {
      console.log(res);
      window.location.reload()
    })
  }
  updateRole() {
    console.log(this.selectedItems2);
    console.log(this.roleForm.value);

    // Update selectedUsers map
    for (let user of this.dropdownList) {
      this.selectedUsers[user.userName] = false;
    }
    for (let user of this.selectedItems2) {
      this.selectedUsers[user.userName] = true;
    }
    console.log(this.selectedUsers);


    this.service.updateRole(this.selectedUsers, this.roleForm.get("roleName")?.value).subscribe((res: any) => {
      console.log(res);
      window.location.reload()
    }, (err: any) => {
      this.getUserByRole();
      this.getusers();
      window.location.reload()
    }
    )
  }
  deleteRole(roleName: any) {
    this.service.deleteRole(roleName).subscribe((res: any) => {
      window.location.reload()});
  }
}
