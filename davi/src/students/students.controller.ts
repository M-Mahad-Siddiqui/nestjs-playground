import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Prisma } from 'generated/prisma';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { StudentsService } from './students.service';

/**
 * Students Controller - Handles all student-related HTTP requests
 * @SkipThrottle() - Disables rate limiting for all routes by default
 */
@SkipThrottle()
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }
  private readonly logger = new MyLoggerService(StudentsController.name);

  /**
   * Create a new student
   * @param createStudentDto - Student data transfer object
   * @returns Created student
   */
  @Post()
  create(@Body() createStudentDto: Prisma.StudentCreateInput) {
    return this.studentsService.create(createStudentDto);
  }

  /**
   * Get all students with optional role filtering
   * Note: Inherits global rate limiting settings (none in this case)
   * @param role - Optional role filter ('INTERN' | 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL')
   * @returns List of students
   */
  @Get()
  findAll(
    @Ip() ip: string, // Example of using Ip decorator to get the requester's IP
    @Query('role') role?: 'INTERN' | 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL',
  ) {
    this.logger.log(`Received request from IP: ${ip} with role filter: ${role}`);
    return this.studentsService.findAll(role);
  }

  /**
   * Get a single student by ID
   * @Throttle(1, 1) - Strict rate limit: 1 request per second
   * @param id - Student ID (numeric string)
   * @returns Student details
   */
  @Throttle({ default: { limit: 1, ttl: 1000 } }) // Updated to object syntax
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  /**
   * Update a student
   * @param id - Student ID to update
   * @param updateStudentDto - Student update data
   * @returns Updated student
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: Prisma.StudentUpdateInput,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  /**
   * Delete a student
   * @param id - Student ID to delete
   * @returns Deleted student
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
