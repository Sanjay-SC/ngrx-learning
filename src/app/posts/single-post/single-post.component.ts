import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {
  post!: any
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    const id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe(
      posts =>{
        this.post = posts.find(post => post.id === id);
        
      }
    )

  }

}
