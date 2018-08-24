import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComicsModel } from '../models/comics.model';

const appKey = "kid_Bki9j4gcM";
const appSecret = "5f14ca958c5441e59977487acab7dba5";
const allUrl = `https://baas.kinvey.com/appdata/${appKey}/comics/` 
const detailsUrl = `https://baas.kinvey.com/appdata/${appKey}/comics/`;
const getUserItemsUrl = `https://baas.kinvey.com/appdata/${appKey}/comics/`


@Injectable()
export class ComicsService {

    constructor(private http : HttpClient) { }

    getAllComics() {
        return this.http.get(allUrl)
    }

    getDetails(id : string) {
        return this.http.get(detailsUrl + id)
    }

    addComics(model : ComicsModel) {
        return this.http.post(allUrl, model)
    }

    editComics(id : string, model : ComicsModel) {
        return this.http.put(allUrl + id, model)
    }

    deleteComics(id : string) {
        return this.http.delete(detailsUrl + id)
    }

    getUserItems(q) {
        return this.http.get(getUserItemsUrl + q)
    }

    getSearch(qs) {
        return this.http.get(allUrl + qs)
    }

}