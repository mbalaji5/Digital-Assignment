import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../../digital.conf";
import { Observable } from "rxjs";
import { User, Post, Comment } from "../model/user.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private url: any;
  constructor(private http: HttpClient) {
    this.url = url;
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url.jsonurl + "users");
  }
  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.url.jsonurl + "posts?userId=" + userId);
  }
  getCommentsPostId(PostId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      this.url.jsonurl + "comments?postId=" + PostId
    );
  }
}
