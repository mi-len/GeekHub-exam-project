import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { UserModel } from '../models/user.model'

const appKey = "kid_Bki9j4gcM";
const appSecret = "5f14ca958c5441e59977487acab7dba5";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const getUserUrl = `https://baas.kinvey.com/user/${appKey}/`

@Injectable()
export class AuthService {
    private currentAuthtoken : string;
    user_id = ''
    userFav : UserModel
    user : UserModel

    constructor(private http : HttpClient) { 
        this.userFav = new UserModel([]);
        this.user_id = localStorage.getItem('user_id')
    }

    login(model : LoginModel) {
        return this.http.post(loginUrl,
        JSON.stringify(model))
    }

    register(model : RegisterModel) {
        return this.http.post(registerUrl,
        JSON.stringify(model))
    }

    logout() {
        return this.http.post(logoutUrl, {})
    }

    getUser(id : string) {
        return this.http.get(getUserUrl + id) 
    }

    checkIfLogged() {
        return this.currentAuthtoken === localStorage.getItem('authtoken');
    }
    get authtoken() {
        return this.currentAuthtoken;
    }
    set authtoken(value : string) {
        this.currentAuthtoken = value;
    }

    isAdmin() {
        if (localStorage.getItem('adm') === '1') {
            return true
        } else {
            return false
        }
    }

    getFav() {
        this.user_id = localStorage.getItem('user_id')
        return this.http.get(getUserUrl + this.user_id)
    }

    pushFav(item, user) {
            user.fav.push(item)
            return this.http.put(getUserUrl + this.user_id, user)
    }

    remFav(items) {
        return this.http.put(getUserUrl + this.user_id, items)
    }

    // private createAuthHeaders(type : string) {
    //     if (type === 'Basic') {
    //         return new HttpHeaders({
    //             'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
    //             'Content-Type': 'application/json'
    //         })
    //     } else {
    //         return new HttpHeaders({
    //             'Authorization' : `Kinvey ${localStorage.getItem('authtoken')}`,
    //             'Content-Type' : 'application/json'
    //         })
    //     }
    // }

}