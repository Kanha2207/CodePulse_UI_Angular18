import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  providers: [MarkdownService],
  imports: [FormsModule, CommonModule, ImageSelectorComponent, MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy{
  
  id:string | null = null;

  blogPost! : BlogPost;
  categories$!:Observable<Category[]>;
  selectedCategories!:string[];

  routeSubscription!: Subscription;
  updateBlogPostSubscription$!:Subscription;
  getBlogPostSubscription$!:Subscription;
  deleteBlogPostSubscription$!:Subscription;
  imageSelectSubscription$!:Subscription;

  isImageSelectorVisible:boolean = false;

  constructor(
    private route:ActivatedRoute, 
    private blogPostService:BlogPostService,
    private categoryService:CategoryService,
    private router: Router,
    private imageService:ImageService){}

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

      this.routeSubscription = this.route.paramMap.subscribe({
        next:(params)=>{
          this.id = params.get('id');

          //Get BlogPost from API
          if(this.id){
            this.getBlogPostSubscription$ = this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(response)=>{
              this.blogPost= response;
              this.selectedCategories = response.categories.map(x=>x.id);
            }
          });
          }

          this.imageSelectSubscription$  = this.imageService.onSelectImage().subscribe({
            next:(response)=>{
              if(this.blogPost)
              {
                this.blogPost.featuredImageUrl = response.url;
                this.isImageSelectorVisible = false;
              }
            }
          })
        }
      })
  }

  onFormSubmit() : void
  {
    //Convert this model to request object
    if(this.blogPost && this.id)
    {
      var updateBlogPost:UpdateBlogPost = {
        author:this.blogPost.author,
        content:this.blogPost.content,
        shortDescription:this.blogPost.shortDescription,
        featuredImageUrl:this.blogPost.featuredImageUrl,
        isVisible:this.blogPost.isvisible,
        publishedDate:this.blogPost.publishedDate,
        title:this.blogPost.title,
        urlHandle:this.blogPost.urlHandle,
        categories:this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription$ = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogPosts');
        }
      })
    }
  }

  onDelete():void{
    if(this.id)
    {
      //call service and delete blogpost
      this.deleteBlogPostSubscription$ = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next:(response)=>
        {
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }
  }

  openImageSelector(): void
  {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }
  
  ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
      this.updateBlogPostSubscription$.unsubscribe();
      this.getBlogPostSubscription$.unsubscribe();
      this.deleteBlogPostSubscription$.unsubscribe();
      this.imageSelectSubscription$.unsubscribe();
  }

}
