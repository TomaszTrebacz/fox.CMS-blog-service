import { CategoryExist, PostExist } from '../../validators';
import { ChangeCategoryPostInput } from '../../graphql';

export class ChangeCategoryPostDto extends ChangeCategoryPostInput {
  @PostExist()
  id: number;

  @CategoryExist()
  category: number;
}
