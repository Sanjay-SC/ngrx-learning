import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
    providedIn: 'root'
})
export class PostsDataService extends DefaultDataService<Post> {

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator
    ) {
        super('Post', http, httpUrlGenerator)
    }

    override getAll(): Observable<Post[]> {
        return this.http.get(`https://vue-completecourse.firebaseio.com/post.json`)
        .pipe(
            map((data: any)=>{
                const posts: Post[] = [];
                for(let key in data){
                    posts.push({...data[key], id: key})
                }
                return posts;
            })
        )
    }

    override add(post: Post): Observable<Post>{
        return this.http.post(`https://vue-completecourse.firebaseio.com/post.json`, post)
        .pipe(
            map((data: any)=>{
                return {...post, id: data.name}
            })
        )
    }

    override update(post: Update<Post>): Observable<Post> {
        return this.http
        .put<Post>(`https://vue-completecourse.firebaseio.com/post/${post.id}.json`, {...post.changes})
    }

    override delete(id: string): Observable<string>{
        return this.http
        .delete<string>(`https://vue-completecourse.firebaseio.com/post/${id}.json`)
        .pipe(
            map(data =>{
                return id;
            })
        )
    }

}
