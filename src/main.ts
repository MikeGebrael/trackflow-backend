import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstrap function that initializes and starts the NestJS application.
 * This function creates an instance of the application, enables CORS (Cross-Origin Resource Sharing),
 * and listens on port 3000.
 */
async function bootstrap() {
  // Create a NestJS application instance using the root module (AppModule).
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins.
  // This allows the frontend application to send and retreive data from the API

  app.enableCors();

  // Declare the port number before starting the server
  const Port = process.env.PORT || 3000;

  // Start the application
  await app.listen(Port);
}

// Invoke the bootstrap function to start the application.
bootstrap();
