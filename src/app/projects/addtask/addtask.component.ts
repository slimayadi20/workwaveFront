
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { TaskService } from 'src/app/Shared/task.service';
import { ScrumboardService } from 'src/app/Shared/scrumboard.service';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {


  tasks: any = [];
  user = [{
    userName: 'slimayadi'
  }];
  scrumboard = {
    sbId: ''
  };

  taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    datedebut: new FormControl('', [Validators.required]),
    datefin: new FormControl('', [Validators.required]),
    scrumboard: new FormControl(this.scrumboard, [Validators.required]),
    user: new FormControl(this.user, [Validators.required]),
    etat: new FormControl('Open'),
  });
  selectedItems: { userName: string }[] = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 3,
    enableCheckAll: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  dropdownList = [];
  pid: any;
  sbId: Number = 0;

  constructor(private SCS: ScrumboardService, private formBuilder: FormBuilder, private taskService: TaskService, private userservice: AuthServiceService, private route: ActivatedRoute) {
  }
  onUserSelect(user: any) {
    console.log(user);
    const selectedUser = { userName: user };
    this.selectedItems.push(selectedUser);
    console.log(this.selectedItems);

  }

  ngOnInit(): void {
    this.pid = this.route.snapshot.queryParams['project'];
    this.SCS.getByProjectId(this.pid).subscribe((res: any) => {
      console.log(res);
      this.sbId = res.sbId;
      this.scrumboard.sbId = res.sbId; // update the sbId property of the scrumboard object
      console.log(this.sbId);
    }
    )
    console.log(this.sbId);
    this.getusers()
  }
  getusers() {
    this.userservice.getusernames().subscribe((res: any) => {
      console.log(res);
      this.dropdownList = res
    });
  }

  addTask(): void {
    this.taskForm.get("user")!.setValue(this.selectedItems);
    console.log(this.dropdownList);

    //  this.scrumboard.get("sbId")!.setValue(this.sbId);
    console.log(this.taskForm.value);
    this.taskService.addTask(this.taskForm.value).subscribe(
      (data: any) => {
      },
      (error: any) => { console.log(error) }
    );
    window.location.reload();
  }
}
