import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './service/categories.service';
import { CategoryEntity } from '../database/entities/category.entity';
import { categoryExist, categoryUnique } from '../validators';
import {
  CreateCategoryResolver,
  DeleteCategoryResolver,
  EditCategoryResolver,
  FindAllCategoriesResolver,
  FindOneResolver,
} from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    CreateCategoryResolver,
    DeleteCategoryResolver,
    EditCategoryResolver,
    FindAllCategoriesResolver,
    FindOneResolver,
    CategoriesService,
    categoryExist,
    categoryUnique,
  ],
})
export class CategoriesModule {}
