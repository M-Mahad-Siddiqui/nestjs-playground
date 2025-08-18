// The AppModule is the root module of your NestJS app.
// Every NestJS application needs at least one module — the AppModule.
// It is annotated with the @Module() decorator, which is like the "configuration file" that tells NestJS:
// What controllers exist
// What services (providers) are available
// What other modules are imported
//main.ts bootstraps the app using AppModule:
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { MyLoggerModule } from './my-logger/my-logger.module';

// Central module that bootstraps the NestJS application
@Module({
  // Imports other modules to include their functionality
  imports: [
    // ConfigModule for environment variable management
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: ['.env.development', '.env'], // Load environment files in order
    }),
    // Feature modules for specific domains
    UsersModule, // Handles user-related functionality
    DatabaseModule, // Manages database connections and configuration
    StudentsModule, // Manages student-related functionality
    // ThrottlerModule for rate limiting API requests
    ThrottlerModule.forRoot([
      {
        name:'short',
        ttl: 60000, // Time-to-live for rate limit (in milliseconds)
        limit: 3, // Maximum number of requests allowed in the TTL
      }, {
        name: 'long',
        ttl: 60000,
        limit:100
      }
    ]), MyLoggerModule,
  ],
  // Controllers handle incoming HTTP requests
  controllers: [
    AppController, // Main application controller
  ],
  // Providers are services or guards available for dependency injection
  providers: [
    AppService, // Main application service
    // Global ThrottlerGuard to enforce rate limiting across the app
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Global ValidationPipe to validate incoming request data
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Automatically validates DTOs
    },
  ],
})
export class AppModule {}