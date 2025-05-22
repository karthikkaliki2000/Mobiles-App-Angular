import { Component } from '@angular/core';
import { MobileService } from './mobile.service';
import { Mobile } from './models/mobile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  
  constructor(private ms: MobileService) {}
  mobiles: Mobile[] = [];
 title = 'Mobile-App';
  formHeader="Add mobile";
  mobileName:any="";
  mobilePrice:any="";
  mobileBrand:any="";
  mobileModel:any="";
  mobileColor:any="";
  mobileRam:any="";
  mobileStorage:any="";
  data!:Mobile;
  id:any=null;


showForm=false;

deleteMobile(id: number) {

  this.ms.deleteMobile(id).subscribe(
    (data:any) =>
      {
        console.log("Delete Api called");
         this.getMobiles();
        },
        (error:any) =>
          {
            console.log(error);
            }
            );

         
            

}


openForm(data: Mobile | null = null){
  this.showForm = true;
  if(data){
   this.mobileName = data.name;
this.mobilePrice = data.price;
this.mobileBrand = data.brand;
this.mobileModel = data.model;
this.mobileColor = data.color;
this.mobileRam = data.ram;
this.mobileStorage = data.storage;
this.id=data.id;
this.formHeader="Edit Mobile";
  }
  else{
    this.id=null;
    this.formHeader="Add mobile";
  }
}
 
closeForm(){
  this.showForm=false;
  this.clearForm();
}

clearForm(){
 this.mobileName = null;
this.mobilePrice = null;
this.mobileBrand = null;
this.mobileModel =null;
this.mobileColor = null;
this.mobileRam = null;
this.mobileStorage =null;
}

saveMobile(){
  this.showForm=false;
  let body:any={
    name:this.mobileName,
    price:this.mobilePrice,
    brand:this.mobileBrand,
    model:this.mobileModel,
    color:this.mobileColor,
    ram:this.mobileRam,
    storage:this.mobileStorage
  
  }
  if(this.id){
    body['id']=this.id;
    this.ms.putMobile(body,this.id).subscribe(
      (response:any)=>{
        console.log(response);
        this.getMobiles();
        },
        (error)=>{
          console.log(error);
          }

    );
  }
  else{
    this.ms.postMobile(body).subscribe(
      (response:any)=>{
        console.log(response);
        this.getMobiles();
        },
        (error)=>{
          console.log(error);
          }
          );
        
  }
}


ngOnInit() {
  this.getMobiles();
}

getMobiles(){
   this.ms.fetchMobiles().subscribe(
    (data: Mobile[]) => {
      console.log(data);
      this.mobiles = data;
    },
    (error) => {
      console.log("Error fetching mobiles:", error);
    }
  );
}

}
