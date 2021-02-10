import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { EditPostDto } from '../../../posts/dto';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('editPost')
export class EditPostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation('editPost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async editPost(
    @Args('editPostInput') editData: EditPostDto,
  ): Promise<boolean> {
    try {
      await this.postsService.editPost(editData);
    } catch (err) {
      throw new Error(`Can not edit post: ${err.message}`);
    }

    return true;
  }
}
