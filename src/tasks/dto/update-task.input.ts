import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  id: number;
}