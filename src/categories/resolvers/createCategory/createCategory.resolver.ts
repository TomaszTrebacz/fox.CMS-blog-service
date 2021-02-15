import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { CreateCategoryDto } from '../../../categories/dto';
import { CategoriesService } from '../../../categories/service/categories.service';
import { CategoryI } from '../../../models/category.interface';

@Resolver('createCategory')
export class CreateCategoryResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation('createCategory')
  async createCategory(
    @Args('createCategoryInput') createData: CreateCategoryDto,
  ): Promise<CategoryI> {
    try {
      const createdCategory = await this.categoriesService.createCategory(
        createData,
      );

      return createdCategory;
    } catch (err) {
      throw Error(`Can not create category: ${err.message}`);
    }
  }
}
