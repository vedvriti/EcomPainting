import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   products:Product[]=[];
   filteredProducts:Product[]=[];
   //created an empty string because intially there is no filter
   sortOrder:string="";

  constructor(private productservice:ProductService, private cartservice:CartService,private snackbar:MatSnackBar){
  }

  ngOnInit(): void {
    //Load the data in the products
      this.productservice.getProducts().subscribe(data=>{
        this.products = data;
        this.filteredProducts = data;
      })
  }

  addToCart(product:Product){
    this.cartservice.addToCart(product).subscribe({
      next:()=>{ //this is like success statement when we add items to cart it will go the server and the server responds with success message abd what is the next step to go forward
        this.snackbar.open("Product added to cart","",{ //snackbar is like pop up when we are clicking on the Card
          duration:2000, //these are the configuration for snackbar
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    })
  }

  //This method is called from an event from an HTMl when we release the key
  // binding the method to an event, the name of the event is keyup
  applyFilter(event:Event):void{ 
    //Read the value from an input field i.e whatever we are writing on search bar
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();
    //filter the product by product name
    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
     //Sorting and filtering goes hannd in hand, whenever we search and set the filter
    this.sortProducts(this.sortOrder) 
  }
  sortProducts(sortValue:string){
    this.sortOrder = sortValue;
    if(this.sortOrder === "priceLowHigh"){
        this.filteredProducts.sort((a,b)=>a.price - b.price)
    }else if(this.sortOrder === "priceHighLow")
    {
        this.filteredProducts.sort((b,a)=>b.price-a.price)
    }
  }
}
