import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostI } from '../../../models/post.interface';

@Resolver('Post')
export class PostsResolver {
  @ResolveField('user')
  getUser(@Parent() post: PostI) {
    return { __typename: 'User', id: post.userId };
  }
}
