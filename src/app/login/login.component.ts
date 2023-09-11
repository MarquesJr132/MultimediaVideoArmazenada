import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BackendService} from "../backend.service";
import {group} from "@angular/animations";
import {User} from "../User";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  users!: any;

  constructor(private router: Router, private service: BackendService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getUsersList()
  }

  initForm() {
    this.formGroup = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  getUsersList() {
    this.service.getUser().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        this.service.dataBaseError()
      }
    })
  }

  login() {
    let group;
    group = this.fb.group({
      "id": 1,
      "user": this.formGroup.controls['user'].value,
      "password": this.formGroup.controls['password'].value
    })
    let verify=false;
    for (var user of this.users) {
      if (user.username === this.formGroup.controls['user'].value) { 
        if (user.password === this.formGroup.controls['password'].value) {
          Swal.fire('Bem vindo!', 'NeshFlix', 'success')
          // @ts-ignore
          this.router.navigate(['/main'], {state: {link: user.id}});
          verify=true;
          break;
        }else{
          Swal.fire('Incorrecto!', 'O password introduzido não esta corecto!', 'error')
          verify=true;
          break;
        }
      }else{
        verify=false;
      }
    }
    if(!verify){
      Swal.fire('Incorrecto!', 'O username introduzido não esta corecto!', 'error')
    }


  }

  recuperar() {

    Swal.fire('Recover!', 'Contacte-nos atraves de nosso email: marquesjr898@gmail.com!', 'error')
  }
}
