import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '../../../posts/service/posts.service';
import { PostEntity } from '../../../database/entities/post.entity';
import { deleteUserPostResolver } from './deleteUserPosts.resolver';

describe('deleteUserPostsResolver', () => {
  let resolver: deleteUserPostResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [deleteUserPostResolver, PostsService],
    }).compile();

    resolver = module.get<deleteUserPostResolver>(deleteUserPostResolver);
  });

  it('should be defined', () => {
    expect(deleteUserPostResolver).toBeDefined();
  });

  const id = '3d248dbc-4475-46e1-8361-6273d0f1fa9c';

  describe('if posts has been successfully deleted', () => {
    it('should return a true', async () => {
      expect(await resolver.deleteUserPosts(id)).toEqual(true);
    });
  });
  describe('otherwise', () => {
    describe('if user does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 'a47751e8-dd77-4f86-ae36-2b4182ca0d93';

        try {
          await resolver.deleteUserPosts(nonExistingID);
        } catch (err) {
          expect(err.message).toEqual(
            `Can not delete posts related to user with id - ${nonExistingID}: Database/ORM error.`,
          );
        }
      });
    });
    describe('if user has not posts', () => {
      it('should throw the detailed error', async () => {
        try {
          await resolver.deleteUserPosts(id);
        } catch (err) {
          expect(err.message).toEqual(
            `Can not delete posts related to user with id - ${id}: Database/ORM error.`,
          );
        }
      });
    });
  });
});
