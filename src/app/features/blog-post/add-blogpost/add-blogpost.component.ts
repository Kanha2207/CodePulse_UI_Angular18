import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy{

  addBlogPost! : AddBlogPost;
  categories$!: Observable<Category[]>;

  isImageSelectorVisible:boolean = false;

  imageSelectorSubscription!:Subscription;

  constructor(private blogPostService:BlogPostService, 
              private router:Router, 
              private categoryService:CategoryService,
              private imageService:ImageService)
              {
                this.addBlogPost = {
                  title:'',
                  shortDescription:'',
                  urlHandle:'',
                  content:'',
                  featuredImageUrl:'',
                  author:'',
                  isVisible:true,
                  publishedDate:new Date(),
                  categories:[]
                }
  }

  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();
     this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
      next:(selectedImage)=>{
        this.addBlogPost.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
     })
  }

  onFormSubmit()
  {
    console.log(this.addBlogPost);
    this.blogPostService.createBlogPost(this.addBlogPost).subscribe({
      next:(Response)=>
      {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

  openImageSelector()
  {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector():void
  {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
      this.imageSelectorSubscription?.unsubscribe();
  }
  
}
