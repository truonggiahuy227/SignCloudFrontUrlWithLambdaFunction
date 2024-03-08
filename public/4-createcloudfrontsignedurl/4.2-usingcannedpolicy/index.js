const AWS = require('aws-sdk');

const crypto = require('crypto');
const replacementChars = {'+':'-', '=':'_', '/':'~'};


const awsSecretsManagerSecretName = 'SecretKeyForSignedUrl';
const awsSecretsManagerSecretKeyName = "SignedUrlPrivateKey";
const amazonCloudFrontKeyPairId = 'K3CY67FF6J3GGR';
const awsRegion = 'us-east-1';
const awsCloudFrontUrl = 'dto1g87ck6nax.cloudfront.net';
const s3ObjectPath = 'sebastian-boring-Y1N6Gl7K5CQ-unsplash.jpg';

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

  let expiration = new Date(event.expiration)/1000|0;
  let cannedPolicy = {
    "Statement":[
      {
        "Resource": event.baseUrl,
        "Condition":{
          "DateLessThan":{
            "AWS:EpochTime": expiration
          }
        }
      }
    ]
  };
  cannedPolicy = JSON.stringify(cannedPolicy);

  let encodedPolicy = new Buffer.from(cannedPolicy).toString("base64");
  encodedPolicy = encodedPolicy.replace(/[+=/]/g, m => replacementChars[m]);

  const signer = crypto.createSign('RSA-SHA1');
  signer.update(cannedPolicy);
  let signedPolicy = signer.sign(await getKeyFromSecretsManager(), 'base64');
  signedPolicy = signedPolicy.replace(/[+=/]/g, m => replacementChars[m]);
  
  const cfSignedUrl = `https://${awsCloudFrontUrl}/${s3ObjectPath}Expires=${expiration}&Signature=${signedPolicy}&Key-Pair-Id=${amazonCloudFrontKeyPairId}`;

  return {
    body: JSON.stringify({cfSignedUrl}),
    statusCode: 200
  };
}