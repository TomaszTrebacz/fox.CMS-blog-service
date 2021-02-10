import { Resolver, Query } from '@nestjs/graphql';
import { CategoriesService } from 'src/categories/service/categories.service';
import { CategoryI } from 'src/models/category.interface';

@Resolver('findAll')
export class FindAllResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('findAll')
  async findAll(): Promise<CategoryI[]> {
    return await this.categoriesService.findAll();
  }
}
