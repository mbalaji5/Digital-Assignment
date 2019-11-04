import { Component, OnInit } from "@angular/core";
import { UsersService } from "./service/users.service";
import { Observable } from "rxjs";
import { User, Post, Comment } from "./model/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private users$: Observable<User[]>;
  private usersPosts$: Observable<Post[]>;
  private usersComments$: Observable<Comment[]>;
  private count: number = 0;
  private checkPostLoading: boolean = false;
  private checkUserCommentsLoading: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.getUsers();
  }
  getUsers(): Observable<User[]> {
    return this.usersService.getUsers();
  }

  getFirstName(name: string) {
    if (name.indexOf("Mrs") >= 0) {
      name = name.substring(name.indexOf("Mrs") + 6, name.length);
    }
    return name.substring(0, name.indexOf(" "));
  }

  getPostsByUserId(userId: number, selectedElement: any) {
    this.count = 3;
    this.checkPostLoading = true;
    this.checkUserCommentsLoading = false;
    var element = document.getElementsByClassName("selectedUser");
    element.length > 0 ? element[0].classList.remove("selectedUser") : 0;

    selectedElement.target.classList.add("selectedUser");
    this.usersPosts$ = this.usersService.getPostsByUserId(userId);
  }

  loadAll() {
    this.usersPosts$.subscribe(x => {
      this.count = x.length;
    });
  }

  expandComments(postId: number) {
    this.checkUserCommentsLoading = true;
    this.usersComments$ = this.usersService.getCommentsPostId(postId);
  }
}
