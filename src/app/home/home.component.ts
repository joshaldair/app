import { Component, OnInit } from '@angular/core';
import { ApiService } from "../shared/api.service";
import {NgForm} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataDisplay: boolean = false; 
  public data = [];
  dtOptions: any = {};
  closeResult: string;

   /*Variables del modal*/
   ref :any = ""
   Color =[];
   Talla =[];
   desclarga:string ="";
   Precio:number = 0;

  constructor(private service:ApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
    lengthMenu : [25, 50, 75, 100],
      processing: true
    };

    this.clean(); //Limpiar campos 

    this.service.getReferencias().subscribe( (data:any) =>{
      if (data) { 
        hideloader(); 
        this.dataDisplay = true;
    } 
      console.log(data);
      this.data = data;
    },err =>{
    
        console.log(err);
    })


     // Function is defined 
     function hideloader() { 
      
      // Setting display of spinner 
      // element to none 
      document.getElementById('loading') 
          .style.display = 'none'; 
    } 
  }
 
  clean(){

   this.ref  = "";
   this.Color =[];
   this.Talla = [];
   this.desclarga ="";
   this.Precio=0;
  }

  open(content,obj) {
     console.log(obj)

     this.clean(); //Limpiar campos 

     this.ref = obj.Ref;
     this.Color = obj.listColores;
     this.Talla = obj.listTallas;
     this.Precio = obj.Precio;
     this.desclarga = obj.desclarga;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
