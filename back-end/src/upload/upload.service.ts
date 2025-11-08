import { Injectable, Inject } from '@nestjs/common';
import * as firebaseAdmin from'firebase-admin';

@Injectable()
export class UploadService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly admin: typeof firebaseAdmin,
  ) {}

  async uploadAudio(file: Express.Multer.File, userId: string): Promise<{ url: string; nom_fichier: string }> {
    const bucket = this.admin.storage().bucket();
    const fileName = `audios/${userId}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    await fileUpload.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return {
      url: publicUrl,
      nom_fichier: file.originalname,
    };
  }

  async uploadPhoto(file: Express.Multer.File, userId: string): Promise<{ url: string; nom_fichier: string }> {
    const bucket = this.admin.storage().bucket();
    const fileName = `photos/${userId}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    await fileUpload.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return {
      url: publicUrl,
      nom_fichier: file.originalname,
    };
  }

  async uploadVideo(file: Express.Multer.File, userId: string): Promise<{ url: string; nom_fichier: string }> {
    const bucket = this.admin.storage().bucket();
    const fileName = `videos/${userId}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    await fileUpload.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return {
      url: publicUrl,
      nom_fichier: file.originalname,
    };
  }
}