import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth, userRole } from '@tomasztrebacz/nest-auth-graphql-redis';
import { EditCategoryDto } from 'src/categories/dto';
import { CategoriesService } from 'src/categories/service/categories.service';

@Resolver('editCategory')
export class EditCategoryResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation('editCategory')
  @Auth(userRole.ADMIN, userRole.ROOT)
  async editCategory(
    @Args('editCategoryInput') editData: EditCategoryDto,
  ): Promise<boolean> {
    try {
      await this.categoriesService.editCategory(editData);

      return true;
    } catch (err) {
      throw new Error(`Can not edit category: ${err.message}`);
    }
  }
}
