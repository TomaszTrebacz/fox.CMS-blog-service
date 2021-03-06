import { PostI } from '../../models/post.interface';
import { EntitySchema } from 'typeorm';

export const PostEntity = new EntitySchema<PostI>({
  name: 'posts',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    title: {
      type: String,
      length: 50,
      nullable: false,
    },
    text: {
      type: String,
      nullable: false,
    },
    imageUrl: {
      type: String,
      nullable: false,
    },
    userId: {
      type: String,
      nullable: false,
    },
    created: {
      type: Date,
      createDate: true,
      nullable: false,
    },
    updated: {
      type: Date,
      updateDate: true,
      nullable: true,
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: 'categories',
      joinColumn: true,
    },
  },
  indices: [
    {
      name: 'IDX_POST',
      unique: true,
      columns: ['id', 'userId'],
    },
  ],
  uniques: [
    {
      name: 'UNIQUE_POST',
      columns: ['title'],
    },
  ],
});
