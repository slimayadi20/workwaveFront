import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { EncryptionService } from '../Shared/encryption.service';
import { BankAccountService } from '../Shared/bank-account.service';
import { StatsService } from '../Shared/stats.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements AfterViewInit, OnInit {
  roles: any;
  taskCount: any;
  taskCompleted: any;
  taskopen: any;
  taskInprogress: any;
  taskToreview: any;



  constructor(private encrypt: EncryptionService, private encryptionService: EncryptionService, private BAS: BankAccountService, private SS: StatsService) { }
  data: any;
  list: any;
  banksaccount: any;
  username = '';
  paymentTotal: any;
  paymentTotalToday: any;
  paymentTotalTodayPercentage: any;
  paymentTotalMonth: any;
  HighestTransaction: any;
  LowestTransaction: any;
  transactionCountMonth: any;
  currentDate!: Date;
  MonthAgoDate!: Date;
  HighestBudget: any;
  LowestBudget: any;
  HighestPayment: any;
  LowestPayment: any;
  balanceHistory: any;
  budgetCount: any;
  ProjectCount: any;
  ProjectActiveCount: any;
  ProjectInActiveCount: any;
  usersPaid: any;
  usersUnpaid: any;

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  @ViewChild('thisMonthPayments')
  thisMonthPaymentsRef!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('canvas2') canvas2!: ElementRef;
  @ViewChild('canvas3') canvas3!: ElementRef;


  private chart!: any;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    this.username = this.data.userName;
    console.log("hhhhhhhhhhhhhhhhhh");
    this.BAS.getbyUser(this.username).subscribe((e: any) => {
      this.banksaccount = e
      console.log(e);
      console.log("slimmmm");

      console.log(this.banksaccount.id);

    })
    this.SS.getBalanceHistory(this.banksaccount.id).subscribe((b: any) => {
      console.log(b);
      this.balanceHistory = b;
      console.log(this.balanceHistory);


      const today = new Date(); // current date
      const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // date one month ago
      const Labels = [];

      for (let date = oneMonthAgo; date <= today; date.setDate(date.getDate() + 1)) {
        const day = date.getDate().toString().padStart(2, '0'); // add leading zero to single digit days
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add leading zero to single digit months
        const label = `${day} ${month}`;
        Labels.push(label);
      }


      this.chart = new Chart(this.canvas.nativeElement, {
        type: 'line',
        data: {
          labels: Labels,
          datasets: [
            {
              label: "Balance",
              data: this.balanceHistory,
              backgroundColor: '#854fff'
            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    }, (err: any) => {
      this.balanceHistory = 0;

    });


    this.SS.getUserUnpaidNumber().subscribe((b: any) => {
      console.log(b);
      this.usersUnpaid = b;
      this.SS.getUserpaidNumber(this.banksaccount.id).subscribe((b: any) => {
        console.log(b);
        this.usersPaid = b;
        console.log("userrrrsss paaaiiiiddd");
        console.log(this.usersPaid.length);
        this.chart = new Chart(this.canvas2.nativeElement, {
          type: 'pie',
          data: {

            datasets: [
              {
                label: "Users Paid",
                data: [this.usersPaid.length],
                backgroundColor: '#854fff'
              },
              {
                label: "Users Unpaid",
                data: [this.usersUnpaid.length],
                backgroundColor: 'rgb(255, 130, 183)'
              }
            ]
          },
          options: {
            aspectRatio: 1
          }
        });
        (err: any) => {
          this.usersPaid = 0;

        }
      });
    },

      (err: any) => {
        this.usersUnpaid = 0;

      });
    let dataFetched = {

      taskCompleted: 0,
      taskopen: 0,
      taskInprogress: 0,
      taskToreview: 0
    };

    const updateChart = () => {
      if (
        dataFetched.taskCompleted &&
        dataFetched.taskopen &&
        dataFetched.taskInprogress &&
        dataFetched.taskToreview
      ) {
        this.chart = new Chart(this.canvas3.nativeElement, {
          type: 'doughnut',
          data: {
            datasets: [
              {
                label: "In Progress",
                data: [dataFetched.taskInprogress],
                backgroundColor: '#8294C4'
              },
              {
                label: "To review",
                data: [dataFetched.taskToreview],
                backgroundColor: '#ACB1D6'
              },
              {
                label: "Completed",
                data: [dataFetched.taskCompleted],
                backgroundColor: '#DBDFEA'
              },
              {
                label: "Open",
                data: [dataFetched.taskopen],
                backgroundColor: '#FFEAD2'
              }
            ]
          },
          options: {
            aspectRatio: 1
          }
        });
      }
    };

    this.SS.getTaskCount().subscribe((b: any) => {
      console.log(b);
      this.taskCount = b;
      updateChart();
    },
      error => {
        console.error(error);
        this.taskCount = null;
        updateChart();
      });

    this.SS.getTaskInCompleted().subscribe((t: any) => {
      console.log(t);
      dataFetched.taskCompleted = t;
      updateChart();
    },
      error => {
        console.error(error);
        dataFetched.taskCompleted = 0;
        updateChart();
      });

    this.SS.getTaskInOpen().subscribe((x: any) => {
      console.log(x);
      dataFetched.taskopen = x;
      updateChart();
    },
      error => {
        console.error(error);
        dataFetched.taskopen = 0;
        updateChart();
      });

    this.SS.getTaskInProgress().subscribe((y: any) => {
      console.log(y);
      dataFetched.taskInprogress = y;
      updateChart();
    },
      error => {
        console.error(error);
        dataFetched.taskInprogress = 0;
        updateChart();
      });

    this.SS.getTaskInToReview().subscribe((z: any) => {
      console.log(z);
      dataFetched.taskToreview = z;
      console.log(dataFetched.taskToreview);
      updateChart();
    },
      error => {
        console.error(error);
        dataFetched.taskToreview = 0;
        updateChart();
      });


    this.SS.getTaskInToReview()
      .subscribe((z: any) => {
        console.log(z);
        dataFetched.taskToreview = z;
        console.log(dataFetched.taskToreview);
        updateChart();
      },
        error => {
          console.error(error);
          dataFetched.taskToreview = 0;
          updateChart();
        });



  }


  public salesStatistics: any = [];

  ngOnInit(): void {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    this.list = [
      `Welcome Back, ${this.data['userName']}!`,
      `¡Bienvenido de nuevo, ${this.data['userName']}!`,
      `Bienvenue de retour, ${this.data['userName']}!`,
      `Willkommen zurück, ${this.data['userName']}!`,
      `Bentornato/a, ${this.data['userName']}!`
    ];
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    this.roles = this.data["role"];
    this.getUser();
    this.getBankAccount();
    this.currentDate = new Date();
    this.MonthAgoDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    this.getBudgetCount()
    this.getProjectActiveCount()
    this.getProjectCount()
    this.getProjectInActiveCount()
  }
  getUser() {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    this.username = this.data.userName;

  }
  getBankAccount() {
    this.BAS.getbyUser(this.username).subscribe((e: any) => {
      console.log(e);
      this.banksaccount = e
      this.getPaymentsTotal(this.banksaccount.id)
      this.getTodayPaymentsTotal(this.banksaccount.id)
      this.getTodayPaymentsPercentageChange(this.banksaccount.id)
      this.getPaymentsThisMonth(this.banksaccount.id)
      this.getLowestTransaction(this.banksaccount.id)
      this.getHighestTransaction(this.banksaccount.id)
      this.getTransactionMonth(this.banksaccount.id)
      this.getHighestBudgetProject(this.banksaccount.id)
      this.getLowestBudgetProject(this.banksaccount.id)
      this.getPaymentsLowest(this.banksaccount.id)
      this.getPaymentsHighest(this.banksaccount.id)
      this.getBalanceHistory(this.banksaccount.id)

    });
  }
  // 
  getPaymentsTotal(id: any) {
    this.SS.getPaymentsTotal(id).subscribe((e: any) => {
      console.log(e);
      this.paymentTotal = e;
    }, error => {
      console.error(error);
      this.paymentTotal = 0;
    });
  }

  getTodayPaymentsTotal(id: any) {
    this.SS.getTodayPaymentsTotal(id).subscribe((e: any) => {
      console.log(e);
      this.paymentTotalToday = e;
    }, error => {
      console.error(error);
      this.paymentTotalToday = 0;
    });
  }

  getTodayPaymentsPercentageChange(id: any) {
    this.SS.getTodayPaymentsPercentageChange(id).subscribe((e: any) => {
      console.log(e);
      this.paymentTotalTodayPercentage = e;
    }, error => {
      console.error(error);
      this.paymentTotalTodayPercentage = 0;
    });
  }

  getPaymentsThisMonth(id: any) {
    this.SS.getPaymentsThisMonth(id).subscribe((e: any) => {
      console.log(e);
      if(e){
        this.paymentTotalMonth = e;

      }
      // const chart = new Chart(this.thisMonthPaymentsRef.nativeElement, {
      //   type: 'line',
      //   data: {
      //     labels: e.months,
      //     datasets: [{
      //       // label: 'Payments This Month',
      //       data: e.values,
      //       //borderColor: 'rgba(75, 192, 192, 1)',
      //       //backgroundColor: 'rgba(75, 192, 192, 0.2)',
      //       fill: true
      //     }]
      //   },
      //   // options: {
      //   //   responsive: true,
      //   //   maintainAspectRatio: false,
      //   //   scales: {
      //   //     y: {
      //   //       beginAtZero: true
      //   //     }
      //   //   }
      //   // }
      // });
    }, error => {
      console.error(error);
      this.paymentTotalMonth = null;
    });
  }

  getHighestTransaction(id: any) {
    this.SS.getHighestTransaction(id).subscribe((e: any) => {
      console.log(e);
      this.HighestTransaction = e;
    }, error => {
      console.error(error);
      this.HighestTransaction = 0;
    });
  }

  // 
  getLowestTransaction(id: any) {
    this.SS.getLowestTransaction(id).subscribe((e: any) => {
      console.log(e);
      this.LowestTransaction = e;
    }, (error: any) => {
      console.error(error);
      this.LowestTransaction = null;
    });
  }

  getTransactionMonth(id: any) {
    this.SS.getTransactionMonth(id).subscribe((e: any) => {
      console.log(e);
      this.transactionCountMonth = e;
    }, (error: any) => {
      console.error(error);
      this.transactionCountMonth = null;
    });
  }

  getHighestBudgetProject(id: any) {
    this.SS.getHighestBudgetProject(id).subscribe((e: any) => {
      console.log(e);
      this.HighestBudget = e;
    }, (error: any) => {
      console.error(error);
      this.HighestBudget = null;
    });
  }

  getLowestBudgetProject(id: any) {
    this.SS.getLowestBudgetProject(id).subscribe((e: any) => {
      console.log(e);
      this.LowestBudget = e;
    }, (error: any) => {
      console.error(error);
      this.LowestBudget = null;
    });
  }

  getPaymentsHighest(id: any) {
    this.SS.getPaymentsHighest(id).subscribe((e: any) => {
      console.log(e);
      this.HighestPayment = e;
    }, (error: any) => {
      console.error(error);
      this.HighestPayment = null;
    });
  }

  getPaymentsLowest(id: any) {
    this.SS.getPaymentsLowest(id).subscribe((e: any) => {
      console.log(e);
      this.LowestPayment = e;
    }, (error: any) => {
      console.error(error);
      this.LowestPayment = null;
    });
  }

  getBalanceHistory(id: any) {
    this.SS.getBalanceHistory(id).subscribe((e: any) => {
      console.log(e);
      this.balanceHistory = e;
    }, (error: any) => {
      console.error(error);
      this.balanceHistory = null;
    });
  }

  getBudgetCount() {
    this.SS.getBudgetCount().subscribe((e: any) => {
      console.log(e);
      this.budgetCount = e;
    }, (error: any) => {
      console.error(error);
      this.budgetCount = null;
    });
  }

  getProjectCount() {
    this.SS.getProjectCount().subscribe((e: any) => {
      console.log(e);
      this.ProjectCount = e;
    }, (error: any) => {
      console.error(error);
      this.ProjectCount = null;
    });
  }

  getProjectActiveCount() {
    this.SS.getProjectActiveCount().subscribe((e: any) => {
      console.log(e);
      this.ProjectActiveCount = e;
    }, (error: any) => {
      console.error(error);
      this.ProjectActiveCount = null;
    });
  }

  getProjectInActiveCount() {
    this.SS.getProjectInActiveCount().subscribe((e: any) => {
      console.log(e);
      this.ProjectInActiveCount = e;
    }, (error: any) => {
      console.error(error);
      this.ProjectInActiveCount = null;
    });
  }



}