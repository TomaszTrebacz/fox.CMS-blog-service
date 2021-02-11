import { Module } from '@nestjs/common';
import { PostsService } from './service/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../database/entities/post.entity';
import { postExist } from '../validators';
import {
  ChangeCategoryPostResolver,
  CreatePostResolver,
  DeletePostResolver,
  deleteUserPostResolver,
  EditPostResolver,
  FindAllResolver,
  FindOneResolver,
  FindUserPostsResolver,
  PostsResolver,
} from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [
    PostsResolver,
    FindOneResolver,
    FindAllResolver,
    FindUserPostsResolver,
    EditPostResolver,
    CreatePostResolver,
    DeletePostResolver,
    ChangeCategoryPostResolver,
    deleteUserPostResolver,
    PostsService,
    postExist,
  ],
})
export class PostsModule {}
