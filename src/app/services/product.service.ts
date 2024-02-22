import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!: Array<Product>;
  constructor() {
    this.products = [
      {id:UUID.UUID(),name:"Computer",price:65000,promotion:true},
      {id:UUID.UUID(),name:"Printer",price:12000,promotion:false},
      {id:UUID.UUID(),name:"Smart Phone",price:450000,promotion:true},
    ];

    for (let index = 0; index < 10; index++) {
     this.products.push({id:UUID.UUID(),name:"Computer",price:65000,promotion:true},
     {id:UUID.UUID(),name:"Printer",price:12000,promotion:false},
     {id:UUID.UUID(),name:"Smart Phone",price:450000,promotion:true}
     );
      
    }

   }

   public getAllProducts(): Observable<Array<Product>>{
    let rnd = Math.random();
    if(rnd<0.1)return throwError(()=>new Error("Internet connexion error"));
    else return of(this.products);
   }

   public getPageProducts(page:number,size:number): Observable<PageProduct>{
    let index = page*size;
    let totalPage = ~~(this.products.length/size);
    if(this.products.length % size!=0)
       totalPage++;
    let pageProduct = this.products.slice(index,index+size);
    return of({page:page, size:size, totalpages:totalPage, products:pageProduct});
   }

   public deleteProduct(id:String): Observable<Boolean>{
    this.products = this.products.filter(p=>p.id!=id);
    return of(true);
   }

   public setPromotion(id:String):Observable<boolean>{
    let product= this.products.find(p=>p.id==id);
    if(product!=undefined){
      product?.promotion!=product?.promotion;
      return of(true);
    }else return throwError(()=> new Error("Product not found"));
   }

   public searchProducts(keyword:string,page:number,size:number):Observable<PageProduct>{
   let result =  this.products.filter(p=>p.name.includes(keyword));
   let index = page*size;
   let totalPage = ~~(result.length/size);
   if(this.products.length % size!=0)
      totalPage++;
   let pageProduct = result.slice(index,index+size);
   return of({page:page, size:size, totalpages:totalPage, products:pageProduct});
   }

   public addNewProduct(product:Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
   }

   public getProduct(id:string):Observable<Product>{
    let product = this.products.find(p=>p.id==id);
    if(product==undefined) return throwError(()=> new Error("Product not found"));
    return of(product);
   }

   public updateProduct(product:Product):Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
   }

   
}
