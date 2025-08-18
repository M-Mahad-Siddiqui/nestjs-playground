=import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private readonly logFilePath = path.join(__dirname, 'logs', 'app.log');

  constructor() {
    super();
    // Ensure the logs directory exists
    this.ensureLogDirectory();
  }

  // Helper method to ensure the logs directory exists
  private async ensureLogDirectory() {
    const logDir = path.dirname(this.logFilePath);
    try {
      await fsPromises.mkdir(logDir, { recursive: true });
    } catch (error) {
      super.error(`Failed to create log directory: ${error.message}`);
    }
  }

  // Method to write log entries to a file
  async logToFile(entry: string) {
    const formattedEntry = `${new Date().toISOString()}\t${entry}\n`;

    try {
      await fsPromises.appendFile(this.logFilePath, formattedEntry, 'utf8');
    } catch (error) {
      super.error(`Failed to write to log file: ${error.message}`);
    }
  }

  // Override log method
  log(message: any, context?: string) {
    const entry = context ? `${context}\t${message}` : `${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  // Override error method
  error(message: any, stackOrTrace?: string) {
    const entry = stackOrTrace ? `${stackOrTrace}\t${message}` : `${message}`;
    this.logToFile(entry);
    super.error(message, stackOrTrace);
  }
}