import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const createUpload = (folder: string, prefix: string) => {

  const storage = multer.diskStorage({

    destination: (req, file, cb) => {

      const uploadPath = `uploads/${folder}`;

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {

      const ext = path.extname(file.originalname);

      cb(
        null,
        `${prefix}-${Date.now()}${ext}`
      );

    }

  });

  return multer({ storage });

};