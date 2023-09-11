import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {videoLink} from "../../environments/environment";
import {Video} from "../Video";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Bookmark} from "../Bookmark";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  mylink?: string;
  // https://drive.google.com/file/d/1K-TIrElqPTDtiH8R7B_gDTp23fNA6FAu/preview
  private value: any;
  // @ts-ignore
  public videos!: Video[];
  public videos2!: Video[];
  public bookmarks!:String[];
  searchContent: string = "";
  constructor(private router: Router, private service: BackendService) {
    const nav = this.router.getCurrentNavigation();

    // @ts-ignore
    this.value = this.router.getCurrentNavigation()?.extras.state.link;
  }
  ngOnInit():void{
    this.initForm();

  }
  initForm(){
     this.getAllVideos()
  }
  logout() {
    this.router.navigate(['/login']);
  }

  getAllVideos() {
    this.service.getVideo().subscribe({
      next: (res:Video[]) => {
        this.videos = res;
        this.videos2=this.videos
      },
      error: (err) => {
        this.service.dataBaseError()
      }
    })
  }

  verVideo(name: String | undefined, namemovie: String | undefined, id: String | undefined) {

    // @ts-ignore
    this.router.navigate(['/video'], {state: {link: name, videoname: namemovie, id: id, userid:this.value}});
  }

  login() {
    this.router.navigate(['/login'])
  }

  search(pesquisarId: string) {
    this.videos=this.videos2.filter((obj)=>obj.tittle?.toUpperCase().startsWith(pesquisarId.toUpperCase()));
  }

  desev() {
    this.router.navigate(['/developers'],{state: {link: this.value}})
  }

  getAllBookMark() { 

    this.service.getAllBookMark().subscribe({
      next:(res:Bookmark[])=>{
        const arr: String[]=[]
        for (var id of res){

          if(this.value==id.userid){
            if (id.videoid != null) {
              arr.push(id.videoid);
            }
          }
        }

        // @ts-ignore
        const aaa=this.videos.filter(({id})=>arr.includes(id));
        this.videos=aaa; 
        // this.videos=this.videos2;
      }
    })
  }

  bookMarkVideo(id: String | undefined) {

  }

  ouvirMusica() {

  }

  download() {

  }

}
