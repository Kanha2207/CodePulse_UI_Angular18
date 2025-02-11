import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories$! : Observable<Category[]>;
  totalCount! : number;
  list : number[] = [];
  pageNumber : number = 1;
  pageSize : number = 5;

  constructor(private categoryService:CategoryService)
  {}

  ngOnInit(): void {
    
    this.categoryService.getCategoryCount().subscribe({
      next:(value)=>{
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));

        this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
      }
    });
  }

  onSearch(query: string)
  {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy:string, sortDirection:string)
  {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber:number)
  {
    this.pageNumber = pageNumber;
    this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
  }

  getNextPage()
  {
    if(this.pageNumber + 1 > this.list.length)
    {
      return;
    } 
    this.pageNumber += 1;
    this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
  }

  getPrevPage()
  {
    if(this.pageNumber - 1 < 1)
    {
      return;
    } 

    this.pageNumber -= 1;
    this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
  }
}
