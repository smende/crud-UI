import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface User{
  firstName:string;
  lastName:string;
  age:number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  public allUsers:User[]=[];

  public user ={
      firstName:"",
      lastName:"",
      age : 0
  }
  constructor(private http:HttpClient) { }

  ngOnInit() {
 
    console.log(" 1 Before Loading Data from API")

    // let a = this.http.get("api/users");

    // console.log(a);

    this.http.get("api/users").subscribe((val : User[]) =>{
        this.allUsers = val;
        console.log("2 After Loading Data from API");
    })

    console.log("3 Next Line");
  }

  createUser(form){
      this.http.post("api/users",form.value).subscribe((val:any) =>{
          let newUser = Object.assign({id:val},form.value);

          this.allUsers.push(newUser);
          this.user = {
            firstName : "",
            lastName :"",
            age : 0
          };
      })
  }

deleteUser(userId){

  let doDelete = confirm("Are you Sure to delete ");

  if(doDelete)
  this.http.delete('api/users/'+userId).subscribe(val =>{
      let i = this.allUsers.findIndex( (a:any) => a.id === userId);

      if(i>-1){
          this.allUsers.splice(i,1);
      }
  })

}

}
