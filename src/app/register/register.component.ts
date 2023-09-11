import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BackendService} from "../backend.service";
import {DialogRef} from "@angular/cdk/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup!: FormGroup;
  user!:any;
  constructor(private router: Router, private service: BackendService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getUsersList()
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      verifyPassword: new FormControl('', [Validators.required])
    })
  }
  getUsersList(){
    this.service.getUser().subscribe({
      next:(res)=>{
        this.user=res;
      },
      error:(err)=>{

      }
    })
  }
  register() {
    let group;
    let verify=false;
    let id=0;
    for(var us of this.user){
      id=us.id+1;
    }
    for(var userx of this.user){ 
      if(userx.user===this.formGroup.controls['username'].value){
        verify=true;
        Swal.fire('Erro!', 'Ja existe uma conta com este Username!', 'error')

        break;
      }
      if(userx.email===this.formGroup.controls['email'].value){
        verify=true;
        Swal.fire('Erro!', 'Ja existe uma conta com este Email!', 'error')
        break;
      }
    }
    if (!verify){
      if (this.formGroup.controls['password'].value===this.formGroup.controls['verifyPassword'].value) {
        group = this.fb.group({
          "username": this.formGroup.controls['username'].value,
          "email": this.formGroup.controls['email'].value,
          "password": this.formGroup.controls['password'].value
        })
        this.service.addUser(group.value).subscribe({
          next: (val: any) => {
            Swal.fire('Bem vindo!', 'Agora pode fazer login e desfrutar do NeshFlix!', 'success')

            this.router.navigate(['/login']);
          },
          error: (err: any) => {
            Swal.fire('Erro!', 'Verifique que a base de dados esteja a correr!', 'error')

          }
        })
      } else {
        this.service.dataBaseError()
      }
    }


  }
}
