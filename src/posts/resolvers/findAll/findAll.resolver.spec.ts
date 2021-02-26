import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { FindAllResolver } from './findAll.resolver';
import { regexURL, regexUUID } from '../../../utils';

describe('FindAllResolver', () => {
  let resolver: FindAllResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [FindAllResolver, PostsService],
    }).compile();

    resolver = module.get<FindAllResolver>(FindAllResolver);
  });

  it('should be defined', () => {
    expect(FindAllResolver).toBeDefined();
  });

  it('should return the posts array', async () => {
    const res = await resolver.findAll();

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
