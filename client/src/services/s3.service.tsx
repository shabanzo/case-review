import AWS from 'aws-sdk';

const s3Config = {
  bucketName: process.env.S3_BUCKET || '',
  region: process.env.AWS_REGION || '',
  accessKeyId: process.env.AWS_SECRET_KEY || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS || '',
};

const getS3FileUrl = (bucketName: string, region: string, key: string) => {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};

export const uploadFile = async (file: File) => {
  AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  });
  const s3 = new AWS.S3({
    params: { bucket: s3Config.bucketName },
    region: s3Config.region,
  });
  const params = {
    Bucket: s3Config.bucketName,
    Key: file.name,
    Body: file,
  };

  try {
    const upload = s3.putObject(params).promise();
    await upload;
    return getS3FileUrl(s3Config.bucketName, s3Config.region, params.Key);
  } catch (exception) {
    console.log(exception);
  }
};
