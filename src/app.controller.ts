import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '@app/common';

/**
 * Controller for handling file operations.
 */
@Controller('file')
export class AppController {
  /**
   * Constructs the AppController.
   * @param {AwsS3Service} awsS3Service - The service for handling AWS S3 operations.
   */
  constructor(private readonly awsS3Service: AwsS3Service) {}

  /**
   * Handles POST requests for file uploads.
   * @param {Express.Multer.File} file - The file to upload.
   * @returns {Promise<{url: string}>} The URL of the uploaded file.
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const url = await this.awsS3Service.uploadFile(file);
    return { url };
  }

  /**
   * Handles DELETE requests for file deletions.
   * @param {string} path - The URL of the file to delete.
   * @returns {Promise<{message: string}>} A message indicating the file was deleted.
   */
  @Delete(':id')
  async deleteFile(@Body('path') path: string): Promise<{ message: string }> {
    await this.awsS3Service.deleteFile(path);
    return { message: 'File deleted successfully' };
  }

  /**
   * Handles PUT requests for file updates.
   * @param {Express.Multer.File} file - The new file to upload.
   * @param {string} path - The URL of the file to replace.
   * @returns {Promise<{url: string}>} The URL of the uploaded file.
   */
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') path: string,
  ): Promise<{ url: string }> {
    const url = await this.awsS3Service.updateFile(file, path);
    return { url };
  }
}
