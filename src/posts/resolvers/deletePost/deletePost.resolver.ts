import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('deletePost')
export class DeletePostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation('deletePost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deletePost(@Args('id') id: number): Promise<boolean> {
    try {
      await this.postsService.deletePost(id);

      return true;
    } catch (err) {
      throw new Error(`Can not delete post: ${err.message}`);
    }
  }
}
