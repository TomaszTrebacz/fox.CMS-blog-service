import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryEntity } from '../../../database/entities/category.entity';
import { FindOneResolver } from './findOne.resolver';

describe('findOneResolver', () => {
  let resolver: FindOneResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([CategoryEntity]),
      ],
      providers: [FindOneResolver, CategoriesService],
    }).compile();

    resolver = module.get<FindOneResolver>(FindOneResolver);
  });

  it('should be defined', () => {
    expect(FindOneResolver).toBeDefined();
  });

  describe('if category exists', () => {
    it('should return a true', async () => {
      expect(await resolver.findOne(1)).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      );
    });
  });
  describe('otherwise', () => {
    describe('if category does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 999999999;

        try {
          await resolver.findOne(nonExistingID);
        } catch (err) {
          expect(err.message).toEqual(
            `Can not find category with id: ${nonExistingID}`,
          );
        }
      });
    });
  });
});
