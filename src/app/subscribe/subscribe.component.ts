import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { UserService } from '../services/user.service'
import { User } from '../services/api'
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  constructor(private service: UserService, private router: Router) { }

  public subscribe(nome: string, email: string, password: string) {
    const data: User = { nome, email, password };
    this.service.createNew(data)
      .then(res => {
        this.router.navigateByUrl("/")
      })

  }
}
