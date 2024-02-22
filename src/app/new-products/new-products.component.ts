import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {

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

handelAddProduct() {
  let product = this.productFormGroup.value;
  this.prodSerice.addNewProduct(product).subscribe({
    next:(data)=>{
      alert("Product Added Successfuly");
    },error: err=>{
      console.log(err);
    }
    
  })
}
  productFormGroup!:FormGroup;
  constructor( private fb:FormBuilder, public prodSerice:ProductService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price:this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion:this.fb.control(false, [Validators.required]),
    });
  }

}
