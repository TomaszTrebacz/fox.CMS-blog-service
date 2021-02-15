import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { CategoriesService } from '../../../categories/service/categories.service';

@Resolver('deleteCategory')
export class DeleteCategoryResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation('deleteCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    try {
      await this.categoriesService.deleteCategory(id);

      return true;
    } catch (err) {
      throw new Error(`Can not delete category: ${err.message}`);
    }
  }
}
