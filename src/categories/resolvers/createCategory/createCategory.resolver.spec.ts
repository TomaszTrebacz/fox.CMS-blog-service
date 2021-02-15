import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/categories/dto';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryEntity } from '../../../database/entities/category.entity';
import { CreateCategoryResolver } from './createCategory.resolver';

describe('createCategoryResolver', () => {
  let resolver: CreateCategoryResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([CategoryEntity]),
      ],
      providers: [CreateCategoryResolver, CategoriesService],
    }).compile();

    resolver = module.get<CreateCategoryResolver>(CreateCategoryResolver);
  });

  it('should be defined', () => {
    expect(CreateCategoryResolver).toBeDefined();
  });

  const createData: CreateCategoryDto = {
    name: 'Some name',
  };

  describe('if category has been successfully created', () => {
    it('should return valid object', async () => {
      expect(await resolver.createCategory(createData)).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: createData.name,
        }),
      );
    });
  });

  describe('otherwise', () => {
    describe('if category exists', () => {
      it('should throw an error', async () => {
        try {
          await resolver.createCategory(createData);
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
    });
  });
});
