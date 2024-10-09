import { Routes } from '@angular/router';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
    
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'', component:HomeComponent, title:'Home'},
    // {path:'login', component:LoginComponent, title:'Login'},
    // {path:'blog/:url', component:BlogDetailsComponent, title:'BlogDetails'},

    {
        path:'login', 
        loadComponent: () => 
            import('./features/auth/login/login.component').then((c) => c.LoginComponent),
            title: 'Login'
    },
    
    {
        path:'blog/:url', 
        loadComponent: () => 
            import('./features/public/blog-details/blog-details.component').then((c) => c.BlogDetailsComponent),
            title: 'BlogDetails'
    },

    // {path:'admin/categories', component:CategoryListComponent, title:'Categories', canActivate:[authGuard]},
    // {path:'admin/categories/add', component:AddCategoryComponent, title:'AddCategories', canActivate:[authGuard]},
    // {path:'admin/categories/:id', component:EditCategoryComponent, title:'EditCategories', canActivate:[authGuard]},
    {
        path:'admin/categories', 
        loadComponent: () => 
            import('./features/category/category-list/category-list.component').then((c) => c.CategoryListComponent),
            title: 'Categories', canActivate: [authGuard]
    },

    {
        path:'admin/categories/add',
        loadComponent: () => 
            import('./features/category/add-category/add-category.component').then((c) => c.AddCategoryComponent),
            title:'AddCategories', canActivate: [authGuard]
    },

    {
        path:'admin/categories/:id',
        loadComponent: () => 
            import('./features/category/edit-category/edit-category.component').then((c) => c.EditCategoryComponent),
            title:'EditCategories', canActivate: [authGuard]
    },

    {
        path: 'admin/blogposts',
        loadComponent: () => 
            import('./features/blog-post/blogpost-list/blogpost-list.component').then((c) => c.BlogpostListComponent),
            title:'BlogPostList', canActivate:[authGuard]
    },

    {
        path: 'admin/blogposts/add',
        loadComponent: () => 
            import('./features/blog-post/add-blogpost/add-blogpost.component').then((c)=> c.AddBlogpostComponent),
            title:'AddBlogPost', canActivate:[authGuard]
    },

    {
        path: 'admin/blogposts/:id',
        loadComponent: () => 
            import('./features/blog-post/edit-blogpost/edit-blogpost.component').then((c) => c.EditBlogpostComponent),
            title:'EditBlogPost', canActivate:[authGuard]
    }
    // {path:'admin/blogposts', component:BlogpostListComponent, title:'BlogPostList', canActivate:[authGuard]},
    // {path:'admin/blogposts/add', component:AddBlogpostComponent, title:'AddBlogPost', canActivate:[authGuard]},
    // {path:'admin/blogposts/:id', component:EditBlogpostComponent, title:'EditBlogPost', canActivate:[authGuard]},
];
