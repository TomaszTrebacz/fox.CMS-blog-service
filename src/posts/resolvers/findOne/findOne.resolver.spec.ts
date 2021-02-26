import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { regexURL, regexUUID } from '../../../utils';
import { FindOneResolver } from './findOne.resolver';

describe('FindOneResolver', () => {
  let resolver: FindOneResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [FindOneResolver, PostsService],
    }).compile();

    resolver = module.get<FindOneResolver>(FindOneResolver);
  });

  it('should be defined', () => {
    expect(FindOneResolver).toBeDefined();
  });

  describe('if post exists', () => {
    it('should return the post', async () => {
      const res = await resolver.findOne(1);

      expect(res).toEqual(
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
      );
    });
  });
  describe('otherwise', () => {
    describe('if post does not exist', () => {
      it('should return an error', async () => {
        const nonExistingId = 999999;

        try {
          await resolver.findOne(nonExistingId);
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
    });
  });
});
