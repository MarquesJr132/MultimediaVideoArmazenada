import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";
import {User} from "./User";
import {Video} from "./Video";
import {Bookmark} from "./Bookmark";
import {Download} from "./Download";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {

  }
  addUser(data:any): Observable<any> {
    return this.http.post('https://neshflix-ba.onrender.com/user/save',data);
  }
  getUser(): Observable<User>{
    return this.http.get('https://neshflix-ba.onrender.com/user/getall');
  }
  getLinks(): Observable<Download[]>{
    return this.http.get<Download[]>('https://neshflix-ba.onrender.com/download/getall');
  }
  dataBaseError(){


  }
  getVideo():Observable<Video[]>{
    return this.http.get<Video[]>('https://neshflix-ba.onrender.com/video/getall');
  }
  bookMarkVideo(group:any):Observable<any>{
    return this.http.post('https://neshflix-ba.onrender.com/bookmark/addbookmark',group);
  }
  getAllBookMark():Observable<Bookmark[]>{
    return this.http.get<Bookmark[]>('https://neshflix-ba.onrender.com/bookmark/getall');
  }
}
