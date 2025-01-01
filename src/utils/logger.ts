import fs from 'fs';
import path from 'path';

// Define the log file path
const logFilePath = path.join(__dirname, 'app.log');

// Function to log messages to a file
export function logToFile(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  // Append the log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
} 