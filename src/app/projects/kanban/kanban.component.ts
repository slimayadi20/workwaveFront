import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumboardService } from 'src/app/Shared/scrumboard.service';
declare var jKanban: any;

@Component({
    
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.css']
})


export class KanbanComponent implements OnInit {
    data: any;
    id: any;
    allTasks: any[]=[];
    todoTasks: any[] = [];
    inProgressTasks: any[] = [];
    doneTasks: any[] = [];
    toReview: any[] = [];
    constructor(private service: ScrumboardService, private route: ActivatedRoute) { }

    

    ngOnInit() {
        this.getData();
       
        
    }
    getData() {
        this.id = this.route.snapshot.queryParams['project'];
        this.service.getByProjectId(this.id).subscribe((res: any) => {
            console.log(res);
            this.allTasks=res.tasks;
            console.log(this.allTasks)
            this.allTasks.forEach((task) => {
                if (task.etat === 'Open') {
                  this.todoTasks.push({
                    title: task.taskName,
                    description: task.description,
                    datedebut: task.datedebut,
                    datefin: task.datefin,
                    status: 'in-progress'
                  });
                } else if (task.etat === 'inProgress') {
                  this.inProgressTasks.push({
                    title: task.taskName,
                    description: task.description,
                    datedebut: task.datedebut,
                    datefin: task.datefin,
                    status: 'in-progress'
                  });
                } else if (task.etat === 'toReview') {
                  this.toReview.push({
                    title: task.taskName,
                    description: task.description,
                    datedebut: task.datedebut,
                    datefin: task.datefin,
                    status: 'in-progress'
                  });
                } else if (task.etat === 'doneTasks') {
                  this.doneTasks.push({
                    title: task.taskName,
                    description: task.description,
                    datedebut: task.datedebut,
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

                    'id': '_open',
                    'title': "Open",
                    'class': 'kanban-light',
                    'item': this.todoTasks.map(task => ({
                        'title': `
                                <div class="kanban-item-title">
                                    <h6 class="title">${task.title}</h6>
                                    <div class="drodown">
                                        <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                            <div class="user-avatar-group">
                                                <div class="user-avatar xs bg-danger"><span>V</span></div>
                                            </div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <ul class="link-list-opt no-bdr p-3 g-2">
                                                <li>
                                                    <div class="user-card">
                                                        <div class="user-avatar sm bg-danger">
                                                            <span>VL</span>
                                                        </div>
                                                        <div class="user-name">
                                                            <span class="tb-lead">Victoria Lynch</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
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
                    'id': '_in_progress',
                    'title': "In Progress",
                    'class': 'kanban-primary',
                    'item': this.inProgressTasks.map(task => ({
                        'title': `
                            <div class="kanban-item-title">
                                <h6 class="title">${task.title}</h6>
                                <div class="drodown">
                                    <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                        <div class="user-avatar-group">
                                            <div class="user-avatar xs bg-danger"><span>V</span></div>
                                        </div>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <ul class="link-list-opt no-bdr p-3 g-2">
                                            <li>
                                                <div class="user-card">
                                                    <div class="user-avatar sm bg-danger">
                                                        <span>VL</span>
                                                    </div>
                                                    <div class="user-name">
                                                        <span class="tb-lead">Victoria Lynch</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
                    'id': '_to_review',
                    'title': "To Review",
                    'class': 'kanban-warning',
                    'item': this.toReview.map(task => ({
                        'title': `
                            <div class="kanban-item-title">
                                <h6 class="title">${task.title}</h6>
                                <div class="drodown">
                                    <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                        <div class="user-avatar-group">
                                            <div class="user-avatar xs bg-danger"><span>V</span></div>
                                        </div>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <ul class="link-list-opt no-bdr p-3 g-2">
                                            <li>
                                                <div class="user-card">
                                                    <div class="user-avatar sm bg-danger">
                                                        <span>VL</span>
                                                    </div>
                                                    <div class="user-name">
                                                        <span class="tb-lead">Victoria Lynch</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
                    'id': '_completed',
                    'title': "Completed",
                    'class': 'kanban-success',
                    'item': this.doneTasks.map(task => ({
                        'title': `
                            <div class="kanban-item-title">
                                <h6 class="title">${task.title}</h6>
                                <div class="drodown">
                                    <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                                        <div class="user-avatar-group">
                                            <div class="user-avatar xs bg-danger"><span>V</span></div>
                                        </div>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <ul class="link-list-opt no-bdr p-3 g-2">
                                            <li>
                                                <div class="user-card">
                                                    <div class="user-avatar sm bg-danger">
                                                        <span>VL</span>
                                                    </div>
                                                    <div class="user-name">
                                                        <span class="tb-lead">Victoria Lynch</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
                       
           // dragEl           : function (el, source) {console.log(el)},      // callback when any board's item are dragged
          //  dragendEl        : function (el) {},                             // callback when any board's item stop drag
        //******** */    dropEl           : function (el, target, source, sibling) {},    // callback when any board's item drop in a board
        //    dragBoard        : function (el, source) {},                     // callback when any board stop drag
          //  dragendBoard     : function (el) {},                             // callback when any board stop drag
        });
        
    })
    }

    
}