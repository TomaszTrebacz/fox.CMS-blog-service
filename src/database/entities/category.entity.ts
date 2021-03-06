import { CategoryI } from '../../models/category.interface';
import { EntitySchema } from 'typeorm';

export const CategoryEntity = new EntitySchema<CategoryI>({
  name: 'categories',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    name: {
      type: String,
      length: 50,
      nullable: false,
    },
  },
  relations: {
    posts: {
      type: 'one-to-many',
      target: 'posts',
      inverseSide: 'category',
    },
  },
  indices: [
    {
      name: 'IDX_CATEGORY',
      unique: true,
      columns: ['id'],
    },
  ],
  uniques: [
    {
      name: 'UNIQUE_CATEGORY',
      columns: ['name'],
    },
  ],
});
