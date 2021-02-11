import { Module } from '@nestjs/common';
import { PostsService } from './service/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../database/entities/post.entity';
import { postExist } from '../validators';
import * as Resolvers from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [...Object.values(Resolvers), PostsService, postExist],
})
export class PostsModule {}
