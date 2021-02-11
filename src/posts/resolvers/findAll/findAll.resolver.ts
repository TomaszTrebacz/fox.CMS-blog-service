import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PostI } from '../../../models/post.interface';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('findAll')
export class FindAllResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('posts')
  async findAll(): Promise<PostI[]> {
    return await this.postsService.findAll();
  }
}
