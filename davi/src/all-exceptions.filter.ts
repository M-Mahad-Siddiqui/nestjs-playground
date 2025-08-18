import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express'; // Use express types directly
import { MyLoggerService } from './my-logger/my-logger.service';
import { Prisma } from 'generated/prisma'; // Adjust based on your Prisma setup

type MyResponseObj = {
  statusCode: number;
  message: string | object;
  error?: string;
  path: string;
  timestamp: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly logger: MyLoggerService) {
    super();
    this.logger.setContext(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';
    let error: string | undefined;

    // Handle HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseObj = exception.getResponse();
      message =
        typeof responseObj === 'string'
          ? responseObj
          : responseObj['message'] || 'Unknown error';
      error =
        typeof responseObj === 'object' ? responseObj['error'] : undefined;
    }
    // Handle PrismaClientValidationError
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message.split('\n').pop() || 'Invalid input data';
      error = 'Prisma Validation Error';
    }
    // Handle other Prisma errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      error = `Prisma Error: ${exception.code}`;
    }
    // Handle generic errors
    else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    // Log the error with stack trace if available
    this.logger.error(
      `Exception caught: ${typeof message === 'string' ? message : JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // Build standardized response
    const errorResponse: MyResponseObj = {
      statusCode: status,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
      response: message, // For backward compatibility; consider deprecating if redundant
    };

    // Send response
    response.status(status).json(errorResponse);
  }
}
