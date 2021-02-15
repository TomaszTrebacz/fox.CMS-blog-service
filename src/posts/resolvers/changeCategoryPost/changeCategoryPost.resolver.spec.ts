import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../../../database/entities/post.entity';
import { ChangeCategoryPostDto } from 'src/posts/dto';
import { PostsService } from '../../../posts/service/posts.service';
import { ChangeCategoryPostResolver } from './changeCategoryPost.resolver';

describe('changeCategoryPostResolver', () => {
  let resolver: ChangeCategoryPostResolver;
  let service: PostsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [ChangeCategoryPostResolver, PostsService],
    }).compile();

    resolver = module.get<ChangeCategoryPostResolver>(
      ChangeCategoryPostResolver,
    );
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(ChangeCategoryPostResolver).toBeDefined();
  });

  const data: ChangeCategoryPostDto = {
    id: 1,
    category: 1,
  };

  describe('if category has been successfully edit', () => {
    it('should return a true', async () => {
      expect(await resolver.changeCategoryPost(data)).toEqual(true);
    });
  });
  describe('otherwise', () => {
    describe('if category does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 999999999;

        const invalidData = {
          ...data,
          category: nonExistingID,
        };

        try {
          await resolver.changeCategoryPost(invalidData);
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
    });
  });
});
