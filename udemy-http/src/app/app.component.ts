import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from './interfaces/post.interface';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('f') forServerForm!: NgForm;

  isFetching: boolean = false;
  posts: Post[] = [];
  error!: string
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.getPosts()
    .subscribe(posts => {
      this.isFetching = false;
      this.posts = posts;
    },
    (error: Error) => {
      this.error = error.message;
    });
  }

  onAddPost(): void {
    this.postsService.createPost(this.forServerForm.form.value)
    .subscribe(() => {
      this.onGetPosts();
      this.forServerForm.reset();
    });
  }

  onGetPosts(): void {
    this.isFetching = true;
    this.postsService.getPosts()
    .subscribe(posts => {
      this.isFetching = false;
      this.posts = posts;
    },
    (error: Error) => {
      this.error = error.message;
    });
  }

  onClearPost(i: number, id?: string): void {
    if (id) {
      this.postsService.deletePost(id)
      .subscribe(() => {
        this.posts.splice(i, 1);
      });
    }
  }
    
  onClearPosts(): void {
    this.postsService.deletePosts().
    subscribe(() => {
      this.posts = [];
    });
  }
}