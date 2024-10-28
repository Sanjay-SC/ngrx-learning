import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // this.posts$ =this.postService.getAll();
    this.posts$ = this.postService.entities$;
  }

  onDelete(event: Event, id: any) {
    // event.preventDefault();
    if (confirm('Are you sure you want to delete the post')) {
      this.postService.delete(id);
    }
  }

}
