import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { UserFormComponent } from './components/user-form/user-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, UserFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // <-- fixed here
})
export class AppComponent {
  title = 'login';
}


// import { Component, effect, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { LoginComponent } from "./login/login.component";
// import { RegisterComponent } from "./register/register.component";
// import { ProfileComponent } from "./profile/profile.component";
// import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, LoginComponent, RegisterComponent, ProfileComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent{
//   title = 'angular-baishak';
 
 /* name:string="Ajaya" //name is property and the string is the datatype
  data:number=30
  data1:number | string = 30  	
  userLogin:Boolean=true
  
  user:any=6  // we can write any kind of data in the this 

  email="ajaya@gmail.com" // If we don't define the datatype then in the typescript the datatype is defined automatically

  apple(){
   // this.email=30  // we get the error on this because we cannot update the datatype because in the above the datatype is already set as a string value
    this.name="Ajaya Shrestha"
    this.data=456
  }
  
  // make a function, we must not use the fuunction keyword 
  // Now lets see that how we can call on the function click
  sum(a:number, b:number){
    let x:number = 10
    console.log(a+b)
  } */ // video 10 10 10 10 10 

  /*
  count:number=0

  handleIncrement(){
    this.count=this.count+1  
  }

  handleDecrement(){
    this.count=this.count-1
  }

  handleReset(){
    this.count=0
  }

  handleCounter(val:string){
    if (val == 'minus' && this.count > 0 ){
      this.count=this.count-1 
    }
    else if (val == 'plus'){
      this.count=this.count+1
    }
    else{
      this.count=0
    }
  
  }
  */ // Video 11 11 11 11 11

  // Video 12 and 13
  //username=""

  //getUserName(event:Event){
    //console.log(event)
  //}
  //getUserName(event:Event){
    // const name = (event.target as HTMLInputElement).value
    // console.log(name);
    // this.username=name 

    // const name = (event.target as HTMLInputElement).value
    // console.log(name);
    // this.username=name 
    // for the short form of this use the below
    //this.username = (event.target as HTMLInputElement).value


  // }

  // setUserName(){
  //   this.username="Ajaya"
  // }

  // getUserNamewithTemplate(val: string){
  //   this.username = val
  //   console.log(val)
  // }

  // color = 'red'
  // handleColor(val:string){
  //   this.color=val
  // }
  // changeColor(event:Event){
  //   this.color = (event.target as HTMLInputElement).value
  // }

  // For Loop
//   users = ["Ajaya", "Sandip", "Tara", "Indira", "Ritika"];
//   students = [
//     {name: 'Ajaya', age: 23, email: 'ajaya@gmail.com'},
//     {name: 'Sandip', age: 24, email: 'sandip@gmail.com'},
//     {name: 'Tara', age: 23, email: 'tara@gmail.com'},
//     {name: 'Indira', age: 24, email: 'indira@gmail.com'},
//     {name: 'Ritika', age: 22, email: 'ritika1@gmail.com'}
//   ]
//   getName(name:string){
//     console.log(name)
//   }
// }




// Event Function
// handleEvent(event:Event){
//   console.log("Function called", event.type)
//   //console.log("Function called", (event.target as HTMLInputElement).name)
//   //console.log("Function called", (event.target as HTMLInputElement).className)
//   console.log("Function called", (event.target as HTMLInputElement).value)

// }




// export class AppComponent {
//   title = 'angular-baishak';
//   name = 'Ajaya Shrestha';
//   a = 5;
//   b = 10;
//   user1 = "Ram";
//   user2  = "Shyam";

//   handleClickEvent() {
//     //alert("fuction called") // first the localhost shows the alert message and then the function is called 
//     console.log("function called ");
//     this.otherFunction()
//   }

//   otherFunction(){
//     console.log("other fucntion"); 
//   }

// export class AppComponent{
//   title = 'angular-baishak';

//   //data = 100
//   count = signal(10)

//   constructor(){
//     effect(()=>{
//       // console.log(this.data)
//       console.log(this.count())
//     })
//   }

  // updateValue(){
  //   //this.data=200
  //   // this.count.set(100)
  //   this.count.set(this.count()+1)
  // }
//   updateValue(val:string){

//     this.count.set(this.count())
//     if(val=='dec' && this.count() > 0 ){
//       this.count.set(this.count()-1)
//     }
//     else{ 
//       this.count.set(this.count()+1)
//     }
//   }


