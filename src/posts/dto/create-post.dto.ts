import { IsUrl, MaxLength, MinLength } from 'class-validator';
import { CategoryExist } from '../../validators';
import { CreatePostInput } from '../../graphql';

export class CreatePostDto extends CreatePostInput {
  @MinLength(10)
  @MaxLength(50)
  title: string;

  @MinLength(50)
  text: string;

  @CategoryExist()
  category: number;

  @IsUrl()
  imageUrl: string;
}
