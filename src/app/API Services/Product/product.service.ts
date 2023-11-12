import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { productInfo } from 'src/app/Models/Product.model';
import { Comment } from 'src/app/Models/Comment.model';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BasicApiService {

  constructor(private http: HttpClient) {
    super();
  }

  async createProduct(product: any): Promise<Observable<productInfo>> {
    return await this.http.post<productInfo>(this.BaseUrl + '/products/create', product, { headers: this.adminHeaders });
  }

  async getProducts(): Promise<Observable<productInfo>> {
    return await this.http.get<productInfo>(this.BaseUrl + '/products');
  }

  async deleteProducts(id: any) {
    return await this.http.delete(this.BaseUrl + '/products/delete/' + id, { headers: this.adminHeaders });
  }

  async updateProducts(id: any, productData: any): Promise<Observable<productInfo>> {
    return await this.http.put<productInfo>(this.BaseUrl + '/products/update/' + id, productData, { headers: this.adminHeaders });
  }
  async getProductsPagination(pageSize: Number, currentPage: Number) {
    return await this.http.post<productInfo>(this.BaseUrl + '/products/pagination', {
      pageSize: pageSize, currentPage: currentPage
    });
  }

  async productsDisplay(category: any, brand: any, tag: any, pageSize: Number, currentPage: Number): Promise<Observable<productInfo>> {
    return await this.http.post<productInfo>(this.BaseUrl + '/products/displayProducts', {
      pageSize: pageSize,
      currentPage: currentPage,
      brand: brand,
      category: category,
      tag: tag
    });
  }

  async getProductsCart(productsIds: any): Promise<Observable<productInfo>> {
    return await this.http.post<productInfo>(this.BaseUrl + '/products/getProductsCart', productsIds);
  }

  async getProductInfo(id: string): Promise<Observable<productInfo>> {
    return await this.http.get<productInfo>(this.BaseUrl + '/products/getProduct/' + id);
  }

  async createProductComment(commentData: any) {
    return await this.http.post<Comment>(this.BaseUrl + '/comments/createProductComment', commentData);
  }

  async updateProductComment(commentData: any, commentId: any) {
    return await this.http.put<Comment>(this.BaseUrl + '/comments/updateProductComment/' + commentId, commentData);
  }

  async deleteProductComment(commentId: any) {
    return await this.http.delete<Comment>(this.BaseUrl + '/comments/deleteProductComment/' + commentId);
  }

  async getProductComment(productId: any,currentPage:any,pageSize:any):Promise<Observable<Comment[]>> {
    return await this.http.post<Comment[]>(this.BaseUrl + '/comments/getProductComments/' + productId,{
      currentPage:currentPage, pageSize:pageSize});
  }
}
