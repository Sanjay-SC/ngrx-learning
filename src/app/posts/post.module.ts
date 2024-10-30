import { Post } from './../models/post.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { PostResolver } from './post.resolver';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { CommonModule } from '@angular/common';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { PostsDataService } from './posts-data.service';
import { PostListComponent } from './post-list/post-list.component';
import { entityMetadata } from './entity-metadata';

const routes: Routes = [
    {
        path: '', component: PostListComponent,
        resolve: { posts: PostResolver }
    },
    { path: 'add', component: AddPostComponent },
    {
        path: 'edit/:id', component: EditPostComponent,
        resolve: { posts: PostResolver }
    },
    {
        path: 'details/:id', component: SinglePostComponent,
        resolve: { posts: PostResolver }
    }
];


@NgModule({
    declarations: [
        PostListComponent,
        SinglePostComponent,
        EditPostComponent,
        AddPostComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        PostsDataService,
        // PostResolver
    ]
})
export class PostsModule {
    constructor(
        eds: EntityDefinitionService,
        entityDataService: EntityDataService,
        postDataService: PostsDataService
    ) {
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post', postDataService)
    }
}