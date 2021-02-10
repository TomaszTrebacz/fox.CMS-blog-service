import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('deleteUserPosts')
export class deleteUserPostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Auth(userRole.ROOT)
  @Mutation('deleteUserPosts')
  async deleteUserPosts(@Args('id') id: string): Promise<boolean> {
    try {
      await this.postsService.deleteUserPosts(id);

      return true;
    } catch (err) {
      throw new Error(
        `Can not delete posts related to user with id - ${id}: ${err.message}`,
      );
    }
  }
}
