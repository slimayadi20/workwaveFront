import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { ScrumboardService } from 'src/app/Shared/scrumboard.service';
import { TaskService } from 'src/app/Shared/task.service';
declare var jKanban: any;

@Component({

    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.css']
})


export class KanbanComponent implements OnInit {
    data: any;
    datarole: any;
    id: any;
    allTasks: any[] = [];
    todoTasks: any[] = [];
    inProgressTasks: any[] = [];
    doneTasks: any[] = [];
    toReview: any[] = [];
    constructor(public service: ScrumboardService, private route: ActivatedRoute, public taskService: TaskService, private router: Router, private encryptionService: EncryptionService) { }



    ngOnInit() {
        this.datarole = this.encryptionService.decrypt(localStorage.getItem('data')!);
        this.getData(this.taskService, this.datarole);
    }
    getData(taskService: TaskService, datarole: any) {
        this.id = this.route.snapshot.queryParams['project'];
        this.service.getByProjectId(this.id).subscribe((res: any) => {
            console.log(res);
            this.allTasks = res.tasks;
            console.log(this.allTasks)
            this.allTasks.forEach((task) => {
                if (task.etat === 'Open') {
                    this.todoTasks.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link: '[routerLink]="[' + '/edit' + ', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'in-progress',
                        users: task.user // assuming that the task object has a 'user' property that is an array of user objects
                    });
                } else if (task.etat === 'In Progress') {
                    this.inProgressTasks.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link: '[routerLink]="[' + '/edit' + ', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'in-progress',
                        users: task.user // assuming that the task object has a 'user' property that is an array of user objects

                    });
                } else if (task.etat === 'To Review') {
                    this.toReview.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link: '[routerLink]="[' + '/edit' + ', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'in-progress',
                        users: task.user // assuming that the task object has a 'user' property that is an array of user objects

                    });
                } else if (task.etat === 'Completed') {
                    this.doneTasks.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link: '[routerLink]="[' + '/edit' + ', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'done',
                        users: task.user // assuming that the task object has a 'user' property that is an array of user objects

                    });
                }
            });


            console.log(this.todoTasks);

            function getUserColor(username: string) {
                const colors = ['#E27D60', '#85DCBA', '#E8A87C', '#C38D9E', '#41B3A3', '#F7CAC9', '#FFC914', '#A8DADC'];
                const index = username ? Math.abs(hashString(username)) % colors.length : Math.floor(Math.random() * colors.length);
                return colors[index];
              }
              
            function hashString(str: string): number {
                let hash = 0;
                if (str.length === 0) {
                  return hash;
                }
                for (let i = 0; i < str.length; i++) {
                  const char = str.charCodeAt(i);
                  hash = ((hash << 5) - hash) + char;
                  hash = hash & hash; // Convert to 32bit integer
                }
                return hash;
              }
              
            var kanban = new jKanban({
                // add your jKanban configuration options here
                // for example:
                element: '#kanban',
                gutter: '0',
                widthBoard: '320px',
                responsivePercentage: false,
                boards: [
                    // add your kanban board configuration options here
                    // for example:
                    {
                        'id': 'Open',
                        'title': "Open",
                        'class': 'kanban-light',
                        'item': this.todoTasks.map(task => ({
                            'title': `
                            <div class="kanban-item-title">
                              <h6 class="title">${task.title} </h6>
                              <h6 class="title" type="hidden" style="display:none">${task.id}</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="user-avatar-group">
                                ${task.users.map((user: any) => `<div class="user-avatar xs ${getUserColor(user.userName || user)}"><span>${user[0] ? user[0]+user[1] : user.userName[0]+user.userName[1]}</span></div>`).join('')}
                                </div>
                                </div>
                          </div>
                          
                            </div>
                            <div class="kanban-item-text">
                              <p>${task.description}</p>
                         
                            </div>
                            <div class="kanban-item-meta">
                              <ul class="kanban-item-meta-list">
                                <li><em class="icon ni ni-calendar"></em><span>${task.datedebut}</span></li>
                                <li><em class="icon ni ni-calendar"></em><span>${task.datefin}</span></li>
                                
                              </ul>
                            
                            </div>
                          
                          `,
                            'draggable': true, // added draggable property
                            'id': task.id // added id property
                        })),
                    },

                    {
                        'id': 'In Progress',
                        'title': "In Progress",
                        'class': 'kanban-primary',
                        'item': this.inProgressTasks.map(task => ({
                            'title': `
                            <div class="kanban-item-title">
                                <h6 class="title">${task.title}</h6>
                                <h6 class="title" type="hidden" style="display:none">${task.id}</h6>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="user-avatar-group">
                                ${task.users.map((user: any) => `<div class="user-avatar xs ${getUserColor(user.userName || user)}"><span>${user[0] ? user[0]+user[1] : user.userName[0]+user.userName[1]}</span></div>`).join('')}
                            </div>
                                   
                                </div>
                            </div>
                            <div class="kanban-item-text">
                                <p>${task.description}</p>
                            </div>
                            <div class="kanban-item-meta">
                                <ul class="kanban-item-meta-list">
                                    <li><em class="icon ni ni-calendar"></em><span>${task.datedebut}</span></li>
                                    <li><em class="icon ni ni-calendar"></em><span>${task.datefin}</span></li>
                                </ul>
                            </div>
                        `,
                        })),

                    },
                    {
                        'id': 'To Review',
                        'title': "To Review",
                        'class': 'kanban-warning',
                        'item': this.toReview.map(task => ({
                            'title': `
                                <div class="kanban-item-title">
                                    <h6 class="title">${task.title}</h6>
                                    <h6 class="title" type="hidden" style="display:none">${task.id}</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                    <div class="user-avatar-group">
                                    ${task.users.map((user: any) => `<div class="user-avatar xs ${getUserColor(user.userName || user)}"><span>${user[0] ? user[0]+user[1] : user.userName[0]+user.userName[1]}</span></div>`).join('')}
                                    </div>
                              
                                    </div>
                                </div>
                                <div class="kanban-item-text">
                                    <p>${task.description}</p>
                                </div>
                                <div class="kanban-item-meta">
                                    <ul class="kanban-item-meta-list">
                                        <li><em class="icon ni ni-calendar"></em><span>${task.datedebut}</span></li>
                                        <li><em class="icon ni ni-calendar"></em><span>${task.datefin}</span></li>
                                    </ul>
                                </div>
                            `,
                        })),

                    },
                    {
                        'id': 'Completed',
                        'title': "Completed",
                        'class': 'kanban-success',
                        'item': this.doneTasks.map(task => ({
                            'title': `
                            <div class="kanban-item-title">
                                <h6 class="title">${task.title}</h6>
                                <h6 class="title" type="hidden" style="display:none">${task.id}</h6>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="user-avatar-group">
                                ${task.users.map((user: any) => `<div class="user-avatar xs ${getUserColor(user.userName || user)}"><span>${user[0] ? user[0]+user[1] : user.userName[0]+user.userName[1]}</span></div>`).join('')}
                                </div>
                               
                                </div>
                            </div>
                            <div class="kanban-item-text">
                                <p>${task.description}</p>
                            </div>
                            <div class="kanban-item-meta">
                                <ul class="kanban-item-meta-list">
                                    <li><em class="icon ni ni-calendar"></em><span>${task.datedebut}</span></li>
                                    <li><em class="icon ni ni-calendar"></em><span>${task.datefin}</span></li>
                                </ul>
                            </div>
                        `,
                        })),

                    }
                ],
                dragEl: function (el: any, source: any) {
                    // Get the source column and card positions
                    const sourceCol = source.parentElement.dataset.id;

                    console.log("Dragged from column:", sourceCol);
                    // console.log(el);
                },
                //   click            : function (el:any) {
                //       console.log(el);

                //   },

                dropEl: function (el: any, target: any, source: any, sibling: any) {
                    // Get the destination column and card positions
                    const targetCol = target.parentElement.dataset.id;

                    // Get the id of the dropped card
                    const cardId = el.querySelector('h6[type="hidden"]').innerText;

                    console.log("Dropped in column:", targetCol);
                    console.log("Dropped card id:", cardId);
                    taskService.changeTasketat(cardId, targetCol).subscribe((res: any) => {
                        // Handle the response from the server here
                        console.log(res);

                        // If the server returns a success message, update the local state to reflect the change
                        if (res.success) {
                            // Find the task in the local state and update its state
                            const taskIndex = this.allTasks.findIndex((task: any) => task.id === cardId);
                            if (taskIndex !== -1) {
                                this.tasks[taskIndex].state = targetCol;
                            }
                        }
                    });
                },
            });
        })
    }


    redirect(id: any) {
        this.router.navigate(['/projects/edit/'], { queryParams: { id: id } });
    }

}