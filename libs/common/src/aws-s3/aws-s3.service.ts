import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

/**
 * Service for handling AWS S3 operations.
 */
@Injectable()
export class AwsS3Service {
  private s3: S3Client;

  /**
   * Constructs the AwsS3Service.
   * Initializes the S3 client with the region and credentials from the config service.
   * @param {ConfigService} configService - The application's configuration service.
   */
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow('AWS_SECRET_KEY'),
      },
    });
  }

  /**
   * Uploads a file to the configured S3 bucket.
   * @param {Express.Multer.File} file - The file to upload.
   * @returns {Promise<string>} The URL of the uploaded file.
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuidv4()}-${file.originalname}`;

    const params = {
      Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
      Key: key,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return `https://${this.configService.getOrThrow('AWS_BUCKET_NAME')}.s3.amazonaws.com/${key}`;
  }

  /**
   * Deletes a file from the configured S3 bucket.
   * @param {string} path - The URL of the file to delete.
   */
  async deleteFile(path: string) {
    const key = path.split('.com/')[1];
    const params = {
      Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
      Key: key,
    };
    const command = new DeleteObjectCommand(params);
    await this.s3.send(command);
    console.log(`Deleted file: ${path}`);
  }

  /**
   * Updates a file in the configured S3 bucket.
   * This is done by deleting the existing file and uploading the new one.
   * @param {Express.Multer.File} file - The new file to upload.
   * @param {string} path - The URL of the file to replace.
   * @returns {Promise<string>} The URL of the uploaded file.
   */
  async updateFile(file: Express.Multer.File, path: string): Promise<string> {
    await this.deleteFile(path);
    return await this.uploadFile(file);
  }
}
