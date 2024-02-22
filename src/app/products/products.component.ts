import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
handleEditProduct(p: Product) {
  this.router.navigateByUrl("/admin/editProduct/"+p.id);
}
handelnewProduct() {
  this.router.navigateByUrl("/admin/newProduct");
}
gotopage(i: number) {
  this.currentPage=i;
  if(this.currentAchtion=="all")
    this.handelGetPagesProducts();
  else 
    this.handelSearchProducts();
}
handelSearchProducts() {
  this.currentAchtion="search";
  this.currentPage=0;
  let keyword = this.searchFormGroup.value.keyword;
  this.productService.searchProducts(keyword,this.currentPage,this.pagesize).subscribe({
    next:(data)=>{
      this.products=data.products;
      this.totalespages=data.totalpages;
    }
  })
}

handleDeleteProduct(p: Product) {
  let conf = confirm("Are you sure?");
  if(conf==false) return; 
  this.productService.deleteProduct(p.id).subscribe({
    next:()=>{
      //this.handelGetAllProducts();
      let index = this.products.indexOf(p);
      this.products.splice(index,1);
    },
    error:(err)=> {
      
    },
  });
}

  products! : Array<Product>;
  erorMessage!:String;
  searchFormGroup!:FormGroup;
  currentPage:number=0;
  pagesize:number=5;
  totalespages:number=0;
  currentAchtion :String="all";

  constructor(private productService:ProductService, private fb:FormBuilder, public authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null)
    });
   //this.handelGetAllProducts();
   this.handelGetPagesProducts();
  }

  handelGetPagesProducts(){
    this.productService.getPageProducts(this.currentPage,this.pagesize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalespages=data.totalpages;
      },
      error:(error)=>{
        this.erorMessage=error;
      }
    });
  }


  handelGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(error)=>{
        this.erorMessage=error;
      }
    });
  }

  hadelSetPromotion(p:Product){
    let prom = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:(data)=>{
        p.promotion=!prom;
      },
      error :err =>{
        this.erorMessage=err;
      }
    })
  }

}
