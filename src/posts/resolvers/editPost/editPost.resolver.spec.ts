import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { EditPostResolver } from './editPost.resolver';

describe('EditPostResolver', () => {
  let resolver: EditPostResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [EditPostResolver, PostsService],
    }).compile();

    resolver = module.get<EditPostResolver>(EditPostResolver);
  });

  it('should be defined', () => {
    expect(EditPostResolver).toBeDefined();
  });

  const data = {
    id: 4,
    title: 'What else?!',
    text: 'Another text',
  };

  describe('if post has been successfully edit', () => {
    it('should return a true', async () => {
      expect(await resolver.editPost(data)).toEqual(true);
    });
  });
  describe('otherwise', () => {
    describe('if post does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 999999999;

        const invalidData = {
          ...data,
          id: nonExistingID,
        };

        try {
          await resolver.editPost(invalidData);
        } catch (err) {
          expect(err.message).toEqual('Can not edit post: Database/ORM error.');
        }
      });
    });
  });
});
