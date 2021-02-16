import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { DeletePostResolver } from './deletePost.resolver';

describe('deletePostResolver', () => {
  let resolver: DeletePostResolver;
  let service: PostsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [DeletePostResolver, PostsService],
    }).compile();

    resolver = module.get<DeletePostResolver>(DeletePostResolver);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(DeletePostResolver).toBeDefined();
  });

  describe('if category has been successfully deleted', () => {
    it('should return a true', async () => {
      const { id } = await service.createPost({
        title: 'Title',
        text: 'Text',
        imageUrl: 'link',
        userId: 'id',
        category: 1,
      });

      expect(await resolver.deletePost(id)).toEqual(true);
    });
  });
  describe('otherwise', () => {
    describe('if post does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 999999999;

        try {
          await resolver.deletePost(nonExistingID);
        } catch (err) {
          expect(err.message).toEqual(
            'Can not delete post: Database/ORM error.',
          );
        }
      });
    });
  });
});
