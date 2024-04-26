import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth } from '../services/api';


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
  constructor(private router: Router, private service: AuthService) { }

  navigateToSubscribe() {
    this.router.navigateByUrl('/subscribe');
  }

  login(username, password) {
    const data: Auth = { username, password };
    console.log('data', data);
    this.service.login(data)
      .then(res => this.router.navigateByUrl('/produtos'))
  }
}
