const AWS = require('aws-sdk');

const awsSecretsManagerSecretName = '';
const awsSecretsManagerSecretKeyName = '';
const amazonCloudFrontKeyPairId = '';
const awsRegion = '';
const awsCloudFrontUrl = '';
const s3ObjectPath = '';

const secretsManager = new AWS.SecretsManager({region: awsRegion});
const getKeyFromSecretsManager = () => {
  return new Promise((resolve, reject) => {
    secretsManager.getSecretValue({SecretId: awsSecretsManagerSecretName}, (err, data) => {
    if (err) {
      console.log ("Get Secret Error", err);
      return reject(err);
    }
    console.log("Private key retrieved");
    const key = JSON.parse(data.SecretString);
    const key_val = key[awsSecretsManagerSecretKeyName].replace(/\\n/g, '\n');
    return resolve(key_val);
    });
  });
}

exports.handler = async function(event, context) {
  console.log(JSON.stringify(event));

  const privateKey = await getKeyFromSecretsManager();

  const signer = new AWS.CloudFront.Signer(amazonCloudFrontKeyPairId, privateKey);

  const delta5Mins = 5 * 60 * 1000;
  const signedUrl = signer.getSignedUrl({
    url: `https://${awsCloudFrontUrl}/${s3ObjectPath}`,
    expires: Math.floor((Date.now() + delta5Mins) / 1000)
  });

  return {
    body: JSON.stringify({signedUrl}),
    statusCode: 200
  };
}