import { Component } from '@angular/core';
import { EncryptionService } from '../Shared/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private encryptionService: EncryptionService) { }

  logout() {
    localStorage.removeItem('data');

    this.router.navigate(['/auth']).then(e => {
      window.location.reload();
    }
    )
  }
}
