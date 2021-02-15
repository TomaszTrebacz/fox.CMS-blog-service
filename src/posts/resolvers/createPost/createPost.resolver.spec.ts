import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../graphql';
import { CreatePostDto } from '../../../posts/dto';
import { PostsService } from '../../../posts/service/posts.service';
import { CreatePostResolver } from './createPost.resolver';
import { PostEntity } from '../../../database/entities/post.entity';

describe('createPostResolver', () => {
  let resolver: CreatePostResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [CreatePostResolver, PostsService],
    }).compile();

    resolver = module.get<CreatePostResolver>(CreatePostResolver);
  });

  it('should be defined', () => {
    expect(CreatePostResolver).toBeDefined();
  });

  const createData: CreatePostDto = {
    title: 'Some title',
    text: 'Some text',
    category: 1,
    imageUrl: 'some Link',
  };

  const user: User = {
    id: '8055d923-0cfd-40e9-879e-638e8ffc7475',
  };

  describe('if post has been successfully created', () => {
    it('should return valid object', async () => {
      expect(await resolver.createPost(user, createData)).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: createData.title,
          text: createData.text,
          category: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
          imageUrl: createData.imageUrl,
          created: expect.any(Date),
          updated: expect.any(Date),
          userId: user.id,
        }),
      );
    });
  });

  describe('otherwise', () => {
    describe('if posts with this name exists', () => {
      it('should throw an error', async () => {
        try {
          await resolver.createPost(user, createData);
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
    });
    describe('if category does not exist', () => {
      it('should throw an error', async () => {
        try {
          const invalidData: CreatePostDto = {
            ...createData,
            category: 9999,
          };
          await resolver.createPost(user, invalidData);
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
    });
  });
});
