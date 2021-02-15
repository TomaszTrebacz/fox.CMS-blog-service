import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryEntity } from '../../../database/entities/category.entity';
import { DeleteCategoryResolver } from './deleteCategory.resolver';

describe('deleteCategoryResolver', () => {
  let resolver: DeleteCategoryResolver;
  let service: CategoriesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([CategoryEntity]),
      ],
      providers: [DeleteCategoryResolver, CategoriesService],
    }).compile();

    resolver = module.get<DeleteCategoryResolver>(DeleteCategoryResolver);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(DeleteCategoryResolver).toBeDefined();
  });

  describe('if category has been successfully deleted', () => {
    it('should return a true', async () => {
      const { id } = await service.createCategory({ name: 'someName' });

      expect(await resolver.deleteCategory(id)).toEqual(true);
    });
  });
  describe('otherwise', () => {
    describe('if category does not exist', () => {
      it('should throw the detailed error', async () => {
        const nonExistingID = 999999999;

        try {
          await resolver.deleteCategory(nonExistingID);
        } catch (err) {
          expect(err.message).toEqual(
            'Can not delete category: Database/ORM error.',
          );
        }
      });
    });
  });
});
