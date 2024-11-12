import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiurl = environment.apiurl+"/cart";
  private apicheckouturl = environment.apiurl + "/checkout"

  constructor(private http:HttpClient) { }

  addToCart(product:Product):Observable<Product[]>{
    return this.http.post<Product[]>(this.apiurl,product)
  }

  getCartItems():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiurl)
  }

  clearCart():Observable<void>{
    return this.http.delete<void>(this.apiurl)
  }

  checkout(cartItems:Product[]): Observable<void>{
    return this.http.post<void>(this.apicheckouturl,cartItems)
  }
}
