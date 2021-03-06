import { Resolver, Query, Args } from '@nestjs/graphql';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryI } from '../../../models/category.interface';

@Resolver('findOne')
export class FindOneResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('category')
  async findOne(@Args('id') id: number): Promise<CategoryI> {
    return await this.categoriesService.findOneById(id);
  }
}
