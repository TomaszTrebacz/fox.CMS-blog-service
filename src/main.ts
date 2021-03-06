import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // format errors from class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        for (const error of errors.values()) {
          const response = error.constraints;
          for (const message in response) {
            return new BadRequestException(`${response[message]}`);
          }
        }
      },
      forbidUnknownValues: false,
    }),
  );

  // using service container allow inject dependencies into validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.APP_PORT);

  Logger.log(
    `Blog-service listening on http://localhost:${process.env.APP_PORT}/graphql`,
    'Bootstrap',
  );
}
bootstrap();
