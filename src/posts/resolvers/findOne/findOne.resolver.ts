import { Resolver, Query, Args } from '@nestjs/graphql';
import { PostI } from '../../../models/post.interface';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('findOne')
export class FindOneResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('post')
  async findOne(@Args('id') id: number): Promise<PostI> {
    return await this.postsService.findOne(id);
  }
}
