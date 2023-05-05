import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    id: any;
    allTasks: any[] = [];
    todoTasks: any[] = [];
    inProgressTasks: any[] = [];
    doneTasks: any[] = [];
    toReview: any[] = [];
    constructor(public service: ScrumboardService, private route: ActivatedRoute, public taskService: TaskService, private router: Router) { }



    ngOnInit() {
        this.getData(this.taskService);


    }
    getData(taskService: TaskService) {
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
                        link:  '[routerLink]="['+'/edit'+', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'in-progress'
                    });
                } else if (task.etat === 'In Progress') {
                    this.inProgressTasks.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link:  '[routerLink]="['+'/edit'+', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'in-progress'
                    });
                } else if (task.etat === 'To Review') {
                    this.toReview.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link:  '[routerLink]="['+'/edit'+', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'in-progress'
                    });
                } else if (task.etat === 'Completed') {
                    this.doneTasks.push({
                        id: task.taskId,
                        title: task.taskName,
                        description: task.description,
                        datedebut: task.datedebut,
                        link:  '[routerLink]="['+'/edit'+', ${task.id}]"',
                        datefin: task.datefin,
                        status: 'done'
                    });
                }
            });
            
            
            console.log(this.todoTasks);




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
                                  <div class="user-avatar xs bg-danger"><span>V</span></div>
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
                            <div class="kanban-item-meta">
                            <ul class="kanban-item-meta-list">
                            <a href="/projects/edit?id=${task.id}" class="btn btn-primary d-none d-md-inline-flex"></em><span>Update</span></a>
                            </ul>
                            <ul class="kanban-item-meta-list">
                            <a href="#" class="btn btn-danger d-none d-md-inline-flex"></em><span>Delete</span></a>
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
                                        <div class="user-avatar xs bg-danger"><span>V</span></div>
                                    </div>
                                    <div class="dropdown dropleft">
                                        <a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 me-n1" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                        <div class="dropdown-menu">
                                            <ul class="link-list-opt no-bdr">
                                                <li><a routerLink=["/"]><em class="icon ni ni-mail"></em><span>Update</span></a></li>
                                                <li><a href="#"><em class="icon ni ni-na"></em><span>Delete</span></a></li>
                                            </ul>
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
                                            <div class="user-avatar xs bg-danger"><span>V</span></div>
                                        </div>
                                        <div class="dropdown dropleft">
                                            <a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 me-n1" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                            <div class="dropdown-menu">
                                                <ul class="link-list-opt no-bdr">
                                                    <li><a href="#"><em class="icon ni ni-mail"></em><span>Update</span></a></li>
                                                    <li><a href="#"><em class="icon ni ni-na"></em><span>Delete</span></a></li>
                                                </ul>
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
                                        <div class="user-avatar xs bg-danger"><span>V</span></div>
                                    </div>
                                    <div class="dropdown dropleft">
                                        <a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 me-n1" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                        <div class="dropdown-menu">
                                            <ul class="link-list-opt no-bdr">
                                                <li><a href="#"><em class="icon ni ni-mail"></em><span>Update</span></a></li>
                                                <li><a href="#"><em class="icon ni ni-na"></em><span>Delete</span></a></li>
                                            </ul>
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
                    // el.parentNode.removeChild(el);
                    // target.insertBefore(el, sibling);
                    console.log(this.taskService)
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


                // dragEl           : function (el, source) {console.log(el)},      // callback when any board's item are dragged
                //  dragendEl        : function (el) {},                             // callback when any board's item stop drag
                //******** */    dropEl           : function (el, target, source, sibling) {},    // callback when any board's item drop in a board
                //    dragBoard        : function (el, source) {},                     // callback when any board stop drag
                //  dragendBoard     : function (el) {},                             // callback when any board stop drag
            });


        })
    }


    redirect(id: any) {
        this.router.navigate(['/projects/edit/'], { queryParams: { id: id } });
    }

}