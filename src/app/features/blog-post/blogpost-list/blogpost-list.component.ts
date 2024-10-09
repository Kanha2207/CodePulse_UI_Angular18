import { Component, OnInit, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {

  blogPosts!:BlogPost[];

  constructor(private blogPostService:BlogPostService)
  {}

  ngOnInit(): void {
      this.blogPostService.getAllBlogPosts().subscribe({
        next:(response)=>{
          this.blogPosts = response
        }
      });
  }
}
