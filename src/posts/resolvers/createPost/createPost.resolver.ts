import { Resolver, Args, Mutation } from '@nestjs/graphql';
import {
  Auth,
  CurrentUser,
  userRole,
} from '@tomasztrebacz/nest-auth-graphql-redis';
import { User } from '../../../graphql';
import { PostI } from '../../../models/post.interface';
import { CreatePostDto } from '../../../posts/dto';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('createPost')
export class CreatePostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Auth(userRole.ADMIN, userRole.ROOT)
  @Mutation('createPost')
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createData: CreatePostDto,
  ): Promise<PostI> {
    try {
      const data = {
        ...createData,
        userId: user.id,
      };

      const createdPost = await this.postsService.createPost(data);

      return createdPost;
    } catch (err) {
      throw new Error(`Can not create post: ${err.message}`);
    }
  }
}
