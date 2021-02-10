import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PostI } from '../../../models/post.interface';
import { PostsService } from '../../../posts/service/posts.service';

@Resolver('findOne')
export class FindOneResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('post')
  async findOne(@Args('id') id: number): Promise<PostI> {
    return await this.postsService.findOne(id);
  }

  @ResolveField('user')
  getUser(@Parent() post: PostI) {
    return { __typename: 'User', id: post.userId };
  }
}
