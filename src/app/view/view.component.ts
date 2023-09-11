import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../backend.service";
import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {Bookmark} from "../Bookmark";
import {group} from "@angular/animations";
import {Video} from "../Video";
import {Download} from "../Download";
import Swal from "sweetalert2";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  // @ts-ignore
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  value: any;
  value2: any;
  value3: any;
  value4: any;
  // @ts-ignore
  public videos!: Video[];
  video!:Video;
  constructor(private route: ActivatedRoute, private router: Router, private service: BackendService) {
    // @ts-ignore
    // https://drive.google.com/file/d/1K-TIrElqPTDtiH8R7B_gDTp23fNA6FAu/preview
    this.value = this.router.getCurrentNavigation()?.extras.state.link;

    // @ts-ignore
    this.value2 = this.router.getCurrentNavigation()?.extras.state.videoname;
    // @ts-ignore
    this.value3 = this.router.getCurrentNavigation()?.extras.state.id;

    // @ts-ignore
    this.value4 = this.router.getCurrentNavigation()?.extras.state.userid;
    

  }

  ngOnInit(): void {
    this.initForm();
    this.getActualVideoInfo()
  }

  initForm() {
    this.getAllVideos();

  }

  getAllVideos() {
    this.service.getVideo().subscribe({
      next: (res: Video[]) => {
        this.videos = res;
      },
      error: (err) => {
        this.service.dataBaseError()
      }
    })
  }

  verVideo(link: String | undefined, title: String | undefined, id: String | undefined) {
    this.router.navigate(['/video'], {state: {link: link, videoname: title, id: id, userid: this.value4}})
      .then(()=>{
        this.value=link;
        this.value2=title;
        this.value3=id;
        this.getActualVideoInfo()
      });


  }

  // verVideo(name: String | undefined, namemovie: String | undefined, id: String | undefined) {
  //
  //   // @ts-ignore
  //   this.router.navigate(['/video'], {state: {link: name, videoname: namemovie, id: id, userid:this.value}});
  // }
  voltar() {
    this.router.navigate(['/main'], {state: {link: this.value4}});
  }

  bookmark() {
    let book: Bookmark = {
      userid: this.value4,
      videoid: this.value3
    }
    this.service.bookMarkVideo(book).subscribe({
      next: (val: any) => {

        Swal.fire('Sucesso', 'Video Gravado com sucesso', 'success')
        // this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.service.dataBaseError()
      }
    })
  }

  download() {
    this.service.getLinks().subscribe({
      next:(val:Download[])=>{
        for(let a of val){
          if(this.value3==a.id){

            Swal.fire('Neshflix', 'Desfrute:)', 'success')
            // @ts-ignore
            window.open(a.link,'_blank')
          }
        }
      },
      error: (err:any)=>{
       this.service.dataBaseError()
      }
    })
  }

  private getActualVideoInfo() {

    this.service.getVideo().subscribe({
      next: (res: Video[]) => {

        for(let a of res){
          if(this.value3==a.id){
            this.video=a;
          }
        }
      },
      error: (err) => {
        this.service.dataBaseError()
      }
    })
  }
}
