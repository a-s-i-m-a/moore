import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3001;

    await app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
  } catch (err) {
    console.error('Error during application bootstrap:', err);
    process.exit(1);
  }
}

bootstrap();
