import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditCategoryInput } from 'src/graphql';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryEntity } from '../../../database/entities/category.entity';
import { EditCategoryResolver } from './editCategory.resolver';

describe('editCategoryResolver', () => {
  let resolver: EditCategoryResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([CategoryEntity]),
      ],
      providers: [EditCategoryResolver, CategoriesService],
    }).compile();

    resolver = module.get<EditCategoryResolver>(EditCategoryResolver);
  });

  it('should be defined', () => {
    expect(EditCategoryResolver).toBeDefined();
  });

  const data: EditCategoryInput = {
    id: 1,
    name: 'newName',
  };

  describe('if category has been successfully edit', () => {
    it('should return a true', async () => {
      expect(await resolver.editCategory(data)).toEqual(true);
    });
  });
  describe('otherwise', () => {
    describe('if category does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 999999999;

        const invalidData = {
          ...data,
          id: nonExistingID,
        };

        try {
          await resolver.editCategory(invalidData);
        } catch (err) {
          expect(err.message).toEqual(
            'Can not edit category: Database/ORM error.',
          );
        }
      });
    });
  });
});
