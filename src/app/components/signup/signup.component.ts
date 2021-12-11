import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = { 
    email: '',
    password: ''
  }

  constructor(
    private Registro: RegistroService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signUp() { //el subscribe es la respuesta que me va a dar el servidor
    this.Registro.signUp(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/misproductos']);
      },
      err => {
        //console.log('error');
        console.log(err);
      },
    )
    //console.log(this.user);
  }

}
