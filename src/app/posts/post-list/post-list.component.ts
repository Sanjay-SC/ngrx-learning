import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OcrService } from './ocr.service';

declare const Tesseract: any

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;
  constructor(
    private postService: PostService,
    private http: HttpClient,
    private ocrService: OcrService
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



  text: any = null;
  isLoading: boolean = false;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      const reader = new FileReader();
      reader.onload = () => {
        Tesseract.recognize(reader.result as string, 'eng', {
          logger: (info: any) => console.log(info), // Logs progress
          tessedit_char_whitelist: '0123456789'
        })
          .then(({ data: { text } }: any) => {
            // console.log('extracted: ', text)
            this.text = text;
            this.isLoading = false;
          })
          .catch((err: any) => {
            console.error(err);
            this.isLoading = false;
          });
      };
      reader.readAsDataURL(file); // Converts the file to a Base64 string
    }
  }





  result: string = '';
  loading = false;


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loading = true;
      this.ocrService.recognizeText(file).subscribe(
        (response) => {
          this.loading = false;
          this.result = response.ParsedResults[0].ParsedText;
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
    }
  }

}
