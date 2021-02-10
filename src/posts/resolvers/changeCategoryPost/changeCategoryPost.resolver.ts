import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { ChangeCategoryPostDto } from 'src/posts/dto';
import { PostsService } from 'src/posts/service/posts.service';

@Resolver('changeCategoryPost')
export class ChangeCategoryPostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation('changeCategoryPost')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async changeCategoryPost(
    @Args('changeCategoryPostInput') changeData: ChangeCategoryPostDto,
  ): Promise<boolean> {
    try {
      await this.postsService.changeCategoryPost(changeData);

      return true;
    } catch (err) {
      throw new Error(`Can not change category: ${err.message}`);
    }
  }
}
