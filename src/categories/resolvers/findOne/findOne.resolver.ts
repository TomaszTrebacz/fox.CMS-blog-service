import { Resolver, Query } from '@nestjs/graphql';
import { CategoriesService } from 'src/categories/service/categories.service';
import { CategoryI } from 'src/models/category.interface';

@Resolver('findOne')
export class FindOneResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('findOne')
  async findOne(): Promise<CategoryI[]> {
    return await this.categoriesService.findAll();
  }
}
