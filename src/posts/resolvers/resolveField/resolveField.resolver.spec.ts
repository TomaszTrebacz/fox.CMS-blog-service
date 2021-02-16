import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { PostsResolver } from './resolveField.resolver';
import { PostI } from '../../../models/post.interface';
import { regexUUID } from '../../../utils';

describe('FindUserPostsResolver', () => {
  let resolver: PostsResolver;
  let service: PostsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [PostsResolver, PostsService],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(PostsResolver).toBeDefined();
  });

  it('shol', async () => {
    const post: PostI = await service.findOne(1);
    expect(await resolver.getUser(post)).toEqual(
      expect.objectContaining({
        __typename: 'User',
        id: expect.stringMatching(regexUUID),
      }),
    );
  });
});
