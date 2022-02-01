import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  token: any;
  company_id: number
  usuario: any;
  company: string;

  apiUrl = 'http://semillero.allsites.es/public/api';
  
  constructor(private http: HttpClient) { }

  login(){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: 'raul@raul.com', 
        password: '123456'})     
        .subscribe(data => {
          this.token = data.data.token; 
          console.log(data); 
          resolve(data);
      });

    });
  }

  loginReal(myemail: string, mypassword: string){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: myemail, 
        password: mypassword})     
        .subscribe(data => {
          this.token = data.data.token;
          this.company_id = data.data.company_id;
         
          resolve(data);   
          console.log(data);   
          err=> {
            console.log(err)
          }      
      });

    });
  }

  obtenerUsuarios(){
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }})
    })
  }

  registrarUsuario(myName: string, mySecondname: string, myCompany_id : number, myEmail: string, myPassword: string, myPasswordConf : string){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register', 
      {
        firstname: myName,
        secondname: mySecondname,
        email: myEmail,
        password: myPassword,
        c_password: myPasswordConf,
        company_id: myCompany_id})
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    });
  }

  activarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/activate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  desactivarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/deactivate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  editarUsuario(id: number, myName: string, mySecondName: string, myEmail: string, myPassword: string, myCompanyId: number){

    return new Promise<any>(resolve => {
      this.http.post(this.apiUrl + '/user/updated/'+id,
      {
        user_id: id,
        firstname: myName,
        secondname: mySecondName,
        company_id: myCompanyId,
        email: myEmail,
        password: myPassword,
        
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
    })
  })
  }

  eliminarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/deleted/'+id,
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })

  }

  obtenerCompanies(){
    return new Promise(resolve =>{
      this.http.get(this.apiUrl + '/companies'
      )
      .subscribe(data => {resolve(data)
        console.log(data)
      err =>{
        console.log(err)
      }})
    })
  }

  obtenerUsuario(id: number){
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/user/'+id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        this.company = data['data']['company'];
        console.log(data);
      err => {
        console.log(err)
      }})
    })
  }

  obtenerFamilias(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/families')
      .subscribe(data => {
        resolve(data);
        console.log(data);
      err =>{
        console.log(err);
        }
      })
    })
  }

  obtenerArticulos(){
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/articles',
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data);
        console.log(data);
      err =>{
        console.log(err);
      }
      })
    })
  }

  obtenerProductosEmpresa(id?: number){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/products/company',
      {
        id: (id == null ? this.company_id : id)
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data =>{
        resolve(data)
        console.log(data);
      err =>{
        console.log(err);
      }
      })
    })
  }

  insertarProductos(articleid: number, myprice: number, myfamilyid: number){
    return new Promise(resolve => {
      this.http.post<Product>(this.apiUrl +'/products',
      {
        article_id: articleid,
        company_id: this.company_id,
        price: myprice,
        family_id: myfamilyid
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data =>{
        resolve(data)
        console.log(data)
      err =>{
        console.log(err)
      }
      })
    })
  }

  eliminarProducto(id: number){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/products/'+id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data =>{
        resolve(data)
        console.log(data)
      err =>{
        console.log(err)
      }
      })
    })
  }

  obtenerArticulo(id: number){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/mostrarArt/'+id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer'+ this.token)
      })
      .subscribe(data =>{
        resolve(data)
        console.log(data)
      err =>{
          console.log(err)
        }
      })
    })
  }

  obtenerPedidos(){
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/orders',
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
      err => {
        console.log(err)
      }
      })
    })
  }

  insertarPedidos(num: string, issue_data: string, origincompanyid: number, targetcompanyid: number, prod: string) {
    return new Promise<any>(resolve =>{
      this.http.post(this.apiUrl + '/orders',
      {
        num: num,
        issue_data: issue_data,
        origin_company_id: origincompanyid,
        target_company_id: targetcompanyid,
        products: prod
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data);
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }
}
