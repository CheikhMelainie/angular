import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
handelUpdateProduct() {
  let p = this.productFormGroup.value;
  p.id=this.product.id;
  this.productService.updateProduct(p).subscribe({
    next:()=>{
      alert("Product Updated success");
    },
    error: err=>{
      console.log(err);
    }
  });
}
  productId!:string;
  product!:Product;
  productFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute, public productService:ProductService, private fb:FormBuilder) {
    this.productId=this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next:(product)=>{
        this.product=product;
        this.productFormGroup=this.fb.group({
          name:this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price:this.fb.control(this.product.price, [Validators.required, Validators.min(200)]),
          promotion:this.fb.control(this.product.promotion, [Validators.required]),
        });
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  getErroMessage(fieldName: string,errors: ValidationErrors) {
    if(errors['required']){
      return fieldName+" is Required";
    }else if(errors['minlength']){
      return fieldName+" should have at least "+errors['minlength']['requiredLength']+"Characters";
    }
    else if(errors['min']){
      return fieldName+" should have min value "+errors['min']['min'];
  } else return "";
  }
  

}
