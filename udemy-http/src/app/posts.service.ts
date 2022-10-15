import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Post } from './interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>(
      'https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/test.json',
      post
    );
  }

  getPosts(): Observable<Post []> {
    return this.http.get<{[key: string]: Post}>('https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/test.json')
    .pipe(map((responseData) => {
      const posts: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key))
          posts.push({...responseData[key], id: key});
      }
      return posts;
    }));
  }
  
  deletePost(id: string): Observable<Object> {
    return this.http.delete(`https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/test/${id}.json`);
  }

  deletePosts(): Observable<Object> {
    return this.http.delete('https://backend-for-angular-demo-default-rtdb.europe-west1.firebasedatabase.app/test.json');
  }
}
