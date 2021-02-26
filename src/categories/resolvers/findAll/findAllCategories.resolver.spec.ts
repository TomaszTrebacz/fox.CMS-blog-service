import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryEntity } from '../../../database/entities/category.entity';
import { FindAllCategoriesResolver } from './findAllCategories.resolver';

describe('findAllCategoriesResolver', () => {
  let resolver: FindAllCategoriesResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ keepConnectionAlive: true }),
        TypeOrmModule.forFeature([CategoryEntity]),
      ],
      providers: [FindAllCategoriesResolver, CategoriesService],
    }).compile();

    resolver = module.get<FindAllCategoriesResolver>(FindAllCategoriesResolver);
  });

  it('should be defined', () => {
    expect(FindAllCategoriesResolver).toBeDefined();
  });

  it('should return the catogories array', async () => {
    const res = await resolver.findAll();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ]),
    );
  });
});
