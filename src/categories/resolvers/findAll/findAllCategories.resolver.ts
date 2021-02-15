import { Resolver, Query } from '@nestjs/graphql';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryI } from '../../../models/category.interface';

@Resolver('findAllCategories')
export class FindAllCategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  async findAll(): Promise<CategoryI[]> {
    return await this.categoriesService.findAll();
  }
}
