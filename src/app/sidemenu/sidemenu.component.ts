import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Shared/auth-service.service';
import { Router } from '@angular/router';
import { EncryptionService } from '../Shared/encryption.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  menuapp: any;
  menu: any;

  user: any;

  notifications: any = [];
  data: any;
  menusettings: any;
  menudashboard: any;

  constructor(private auth: AuthServiceService, private router: Router, private encryptionService: EncryptionService) { }

  ngOnInit(): void {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data["role"]);

    switch (this.data["role"]) {
      case "Admin":
        this.menuapp = [

          {
            mainTitle: "APPLICATIONS",
            title: "Courses",
            counter: 0,
            icon: 'icon ni ni-book-fill',
            subMenus: [

              {
                title: "Display Courses",
                counter: 0,
                link: '/courses/displaycourseAdmin',
                icon: ''
              },
              {
                title: "Display Categories",
                counter: 0,
                link: '/courses/displaycateg',
                icon: ''

              },

              {
                title: "Display quiz",
                counter: 0,
                link: '/courses/displayQuiz',
                icon: ''

              },
              {
                title: "Display cours",
                counter: 0,
                link: '/courses/displayCours',
                icon: ''

              },
              {
                title: "Enroll History",
                counter: 0,
                link: '/courses/enrollement',
                icon: ''

              }
            ]
          },
          {
            mainTitle: "APPLICATIONS",
            title: "Projects",
            counter: 0,
            icon: 'icon ni ni-tile-thumb-fill',
            subMenus: [
              {
                title: "Display Projects",
                counter: 0,
                link: '/projects/displayprojects',
                icon: ''

              },
            ]
          },
          {
            mainTitle: "APPLICATIONS",
            title: "Products",
            counter: 0,
            icon: 'icon ni ni-card-view',
            subMenus: [
              {
                title: "Product List",
                counter: 0,
                link: '/products/displayproduct',
                icon: ''

              },
              {
                title: "Product Create",
                counter: 0,
                link: '/products/createproduct',
                icon: ''

              }

            ]
          },
          {
            mainTitle: "APPLICATIONS",
            title: "Suppliers",
            counter: 0,
            icon: 'icon ni ni-user-list-fill',
            subMenus: [
              {
                title: "Supplier's list",
                counter: 0,
                link: '/Supplier/displaysupplier',
                icon: ''

              },
              {
                title: "add Supplier",
                counter: 0,
                link: '/Supplier/createsupplier',
                icon: ''

              }]
          },
          {
            mainTitle: "APPLICATIONS",
            title: "Orders",
            counter: 0,
            icon:'icon ni ni-cc-alt2-fill',
            subMenus: [
              {
                title: "orders  list",
                counter: 0,
                link: '/Order/displayorder',
                icon: ''

              },
              {
                title: "add order",
                counter: 0,
                link: '/Order/createorder',
                icon: ''

              }

            ]
          },
          {
            mainTitle: "APPLICATIONS",
            title: "Applications",
            counter: 0,
            icon: 'icon ni ni-grid-alt-fill',

            subMenus: [
              {
                title: "Chat",
                counter: 0,
                link: '/chat/displaychat',
                icon: ''

              },
              {
                title: "Calendar",
                counter: 0,
                link: '/chat/displaycalendar',
                icon: ''

              }
            ]
          },]
        this.menudashboard = [
          {
            mainTitle: "Dashboards",
            title: "Dashboard",
            counter: 0,
            icon: 'icon ni ni-activity-round-fill',
            subMenus: [
              {
                title: "Sales",
                counter: 0,
                link: 'payements/displaypayements',
                icon: ''

              },
              {
                title: "Analytics",
                counter: 0,
                link: '/chat/displaycalendar',
                icon: ''

              }
            ]
          },]
        this.menusettings = [

          {
            mainTitle: "Settings",
            title: "User manage",
            counter: 0,
            icon: 'icon ni ni-users-fill',
            subMenus: [
              {
                title: "Display users",
                counter: 0,
                link: '/users/displayusers',
                icon: ''
              },
              {
                title: "Display Roles",
                counter: 0,
                link: '/users/roles',
                icon: ''
              },
            ]
          },
          {
            mainTitle: "Settings",
            title: "User holiday",
            counter: 0,
            icon: 'icon ni ni-users-fill',
            subMenus: [
              {
                title: "Holidays List",
                counter: 0,
                link: '/users/displayholidays',
                icon: ''

              },

            ]
          },
        ]
        break;

      case "Employee":
        this.menuapp = [

          {
            mainTitle: "APPLICATIONS",
            title: "Courses",
            counter: 0,
            icon: 'icon ni ni-book-fill',
            subMenus: [
              {
                title: "courses list",
                counter: 0,
                link: '/courses/displaycourse',
                icon: ''

              },
            ]
          },
          {
            mainTitle: "APPLICATIONS",
            title: "Projects",
            counter: 0,
            icon: 'icon ni ni-tile-thumb-fill',
            subMenus: [
              {
                title: "Display Projects",
                counter: 0,
                link: '/projects/displayprojects',
                icon: ''

              },
            ]
          },

          {
            mainTitle: "APPLICATIONS",
            title: "Applications",
            counter: 0,
            icon: 'icon ni ni-card-view',

            subMenus: [
              {
                title: "Chat",
                counter: 0,
                link: '/chat/displaychat',
                icon: ''

              },
              {
                title: "Calendar",
                counter: 0,
                link: '/chat/displaycalendar',
                icon: ''

              }
            ]
          },]
        this.menudashboard = [
          {
            mainTitle: "Dashboards",
            title: "Dashboard",
            counter: 0,
            icon: 'icon ni ni-activity-round-fill',
            subMenus: [
              {
                title: "Sales",
                counter: 0,
                link: 'payements/displaypayements',
                icon: ''

              },
              {
                title: "Analytics",
                counter: 0,
                link: '/chat/displaycalendar',
                icon: ''

              }
            ]
          },]
        break;
    }






  }

}
