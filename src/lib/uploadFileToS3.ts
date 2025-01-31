import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (file: File) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME!;
    const objectKey = `${Date.now()}_${file.name}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket: bucketName,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;
  } catch (error) {
    console.error("Error al subir archivo a S3", error);
    throw new Error("Error al subir archivo a S3");
  }
};
