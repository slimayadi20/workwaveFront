import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { ScrumboardService } from 'src/app/Shared/scrumboard.service';
import { TaskService } from 'src/app/Shared/task.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
 
  
    @Input() taskId: any;
  // @Input() taskName: any;
  // @Input() description: any;
  // @Input() datedebut: any;
  // @Input() datefin: any;
  // @Input() scrumboard: any;
  // @Input() user :any ;
  // @Input() etat: any;


  taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    datedebut: new FormControl('', [Validators.required]),
    datefin: new FormControl('', [Validators.required]),
    // scrumboard: new FormControl(this.scrumboard, [Validators.required]),
    // user: new FormControl(this.user, [Validators.required]),
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
  // @Input() taskId: any;

  constructor(private SCS: ScrumboardService, private formBuilder: FormBuilder, private taskService: TaskService, private userservice: AuthServiceService, private route: ActivatedRoute) {
  }
  onUserSelect(user: any) {
    console.log(user);
    const selectedUser = { userName: user };
    this.selectedItems.push(selectedUser);
    console.log(this.selectedItems);

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    const taskId = this.route.snapshot.paramMap.get('taskId');
    console.log("task id "+this.taskId);
    if (taskId != null) {
    this.taskService.getTaskById(this.taskId).subscribe(task => {

    });
  }
    // this.pid = this.route.snapshot.queryParams['project'];
    // this.SCS.getByProjectId(this.pid).subscribe((res: any) => {
    //   console.log(res);
    //   this.sbId = res.sbId;
    //   this.scrumboard.sbId = res.sbId; // update the sbId property of the scrumboard object
    //   console.log(this.sbId);
    // }
    // )
    // console.log(this.sbId);
    // this.getusers()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskName'].currentValue != null) {
      this.taskForm.get("taskName")!.setValue(changes['taskName'].currentValue);
      this.taskForm.get("description")!.setValue(changes['description'].currentValue);
   
    }
    if (changes['taskName'].currentValue == null) {
      this.taskForm.get("taskName")!.setValue("");
      this.taskForm.get("description")!.setValue("");
    }
  }

  getusers() {
    this.userservice.getusernames().subscribe((res: any) => {
      console.log(res);
      this.dropdownList = res
    });
  }

  addTask(): void {
    // this.taskForm.get("user")!.setValue(this.selectedItems);
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
