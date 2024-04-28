import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth, ErrorBody } from '../services/api';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private service: AuthService, private snackBar: MatSnackBar) { }

  navigateToSubscribe() {
    this.router.navigateByUrl('/subscribe');
  }

  login(username, password) {
    const data: Auth = { username, password };
    this.service.login(data)
      .then(res => {
        localStorage.setItem('userId', res);
        this.router.navigateByUrl('/produtos');
      })
      .catch(e => {
        this.snackBar.open(e.error.mensagem, 'Fechar', {
          duration: 5000,
          panelClass: ['warning-snackbar']
        })
      })
  }
}
