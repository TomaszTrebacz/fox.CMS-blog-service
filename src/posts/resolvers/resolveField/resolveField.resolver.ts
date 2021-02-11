import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostI } from 'src/models/post.interface';

@Resolver('Post')
export class PostsResolver {
  constructor() {}

  @ResolveField('user')
  getUser(@Parent() post: PostI) {
    return { __typename: 'User', id: post.userId };
  }
}