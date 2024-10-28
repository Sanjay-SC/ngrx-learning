import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    })
  }

  onAddPost(){
    const post: Post = this.addPostForm.value;
    this.postService.add(post)
    .subscribe(
      data =>{
        this.router.navigate(['/posts']);
      }
    )
  }

}