import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users/');
  },
  filename: (req: any, file, cb) => {
    const userId = req.user?.IdPersona || Date.now();

    const ext = path.extname(file.originalname);
    cb(null, `user-${userId}${ext}`);
  }
});

export const upload = multer({ storage });