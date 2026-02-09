import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
dotenv.config();

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});



export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",          
    key: (req, file, cb) => {
      const folder = req.body.folder || "others"; 
      const timestamp = Date.now();
      const fileName = `${folder}/${timestamp}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});


