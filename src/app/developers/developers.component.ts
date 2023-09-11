import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit{
  private value: any;
  constructor(private router:Router, private service: BackendService) {
    const nav = this.router.getCurrentNavigation();
    // @ts-ignore
    this.value = this.router.getCurrentNavigation()?.extras.state.link;
  }
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
     // this.refresh()
  }
  refresh(): void {
    window.location.reload();
  }
  login(){
    this.router.navigate(['/main'],{state: {link: this.value}})
  }
}
