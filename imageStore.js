var AWS = require('aws-sdk');

module.exports = async function(file, url) {
   try {
      const AWSAccessKeyId = process.env.ST_KEY;
      const AWSSecretAccessKey = process.env.ST_SECRET;
      const S3Bucket = process.env.ST_BUCKET;

      AWS.config.update({ accessKeyId: AWSAccessKeyId, secretAccessKey: AWSSecretAccessKey });

      var s3 = new AWS.S3();
      let s3Result = await s3.upload({
         Bucket: S3Bucket,
         Key: url + Math.floor(new Date() / 1000) + '.png',
         Body: file
      }).promise();

      console.log("Image Location: ", s3Result.Location)
   } catch (error) {
      console.log("​catch -> error", error.message)
   }
}
