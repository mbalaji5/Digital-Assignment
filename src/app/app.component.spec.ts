import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { UsersService } from "./service/users.service";
import { of } from "rxjs";
import { users } from "./testData";

describe("AppComponent", () => {
  let mockData;
  let getUserSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [UsersService]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should get the users`, () => {
    mockData = users;
    let getUser;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    getUser = app.getUsers();
    fixture.detectChanges();
    getUser.subscribe(responce => {
      expect(responce).toBe(mockData);
    });
  });

  it("should get the first name from the user name", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let firstName = app.getFirstName("Balaji Mohanasundaram");
    expect(firstName).toBe("Balaji");
  });
  it(`should get the User Comments by post ID`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.expandComments(10);
    app.usersComments$.subscribe(response => {
      expect(response).toBeUndefined();
    });
  });
});
