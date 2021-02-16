import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { FindUserPostsResolver } from './findUserPosts.resolver';
import { regexURL, regexUUID } from '../../../utils';

describe('FindUserPostsResolver', () => {
  let resolver: FindUserPostsResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [FindUserPostsResolver, PostsService],
    }).compile();

    resolver = module.get<FindUserPostsResolver>(FindUserPostsResolver);
  });

  it('should be defined', () => {
    expect(FindUserPostsResolver).toBeDefined();
  });

  describe('if user and posts exist', () => {
    it('should return the posts array', async () => {
      const id = '8055d923-0cfd-40e9-879e-638e8ffc7475';
      let res = await resolver.findUserPosts(id);

      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String),
            imageUrl: expect.stringMatching(regexURL),
            userId: expect.stringMatching(regexUUID),
            category: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
            created: expect.any(Date),
            updated: expect.any(Date),
          }),
        ]),
      );
    });
  });
  describe('otherwise', () => {
    it('should throw an error', async () => {
      const nonExistingID = 'a47751e8-dd77-4f86-ae36-2b4182ca0d93';
      try {
        await resolver.findUserPosts(nonExistingID);
      } catch (err) {
        expect(err.message).toEqual('Can not find any data.');
      }
    });
  });
});
