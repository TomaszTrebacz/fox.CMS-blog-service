import { Resolver, Query, Args } from '@nestjs/graphql';
import { PostI } from '../../../models/post.interface';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('findUserPosts')
export class FindUserPostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('userPosts')
  async findUserPosts(@Args('id') id: string): Promise<PostI[]> {
    return await this.postsService.findUserPosts(id);
  }
}
