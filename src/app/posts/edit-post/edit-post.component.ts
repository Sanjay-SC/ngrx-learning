import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent {
  editPostForm!: FormGroup;
  id!: string;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe(
      posts => {
        if (posts.length) {
          const post = posts.find(post => post.id === this.id);
          this.editPostForm.patchValue({
            title: post?.title,
            description: post?.description
          });
        }
      }
    )

  }

  onEditPost() {
    const postData = {
      ...this.editPostForm.value,
      id: this.id
    }
    this.postService.update(postData);
    this.router.navigate(['posts']);
  }

}
