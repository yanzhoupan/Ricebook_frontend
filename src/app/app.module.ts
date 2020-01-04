import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http'; 
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { PostsComponent } from './main/posts/posts.component';
import { PostsService } from './main/posts/posts.service';
// import { ArticleComponent } from './main/posts/article/article.component';
import { NgAisModule } from 'angular-instantsearch';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// import { myPaginator } from './main/posts/article/my-paginator';
// import { MatPaginatorIntl } from '@angular/material';
// import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AuthComponent,
    MainComponent,
    RegisterationComponent,
    PostsComponent,
    // ArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgAisModule,
    // DemoMaterialModule
    // MatPaginatorIntl
  ],
  providers: [
    PostsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
