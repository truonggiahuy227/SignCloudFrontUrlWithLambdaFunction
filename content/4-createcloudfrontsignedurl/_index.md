---
title : "Create Lambda Function"
date : "`r Sys.Date()`"
weight : 4
chapter : false
pre : " <b> 4. </b> "
---

### Introduction

**AWS Lambda** is a compute service that lets you run code without provisioning or managing servers. Lambda runs your code on a high-availability compute infrastructure and performs all of the administration of the compute resources, including server and operating system maintenance, capacity provisioning and automatic scaling, and logging.

In this step you will create **AWS Lambda** and use it to create **Amazon CloudFront Signed URLs**.

### Architecture

![Overview](/SignCloudFrontUrlWithLambdaFunction/images/signURL-3.png)

### Create Lambda Function

1. From your AWS management console and navigate to the [AWS Lambda Management Console](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-east-1#/functions).

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-1.png)

2. Select the same AWS **Region** that you use for **AWS Secrets Manager**. Currently, this lab uses region **us-east-1**.
3. Click on **Functions** on the left navigation, and then choose **Create function**.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-2.png)

4. From **Create function** window:
      + Select **Author from scratch**.
      + For **Function name**, provide a name. For example: `signCloudFrontUrlFunction`
      + For **Runtime**, select **Node.js 16.x**.
    
    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-3.png)

5. Scroll down to **Change default execution role** section, for **Execution role** select **Create a new role with basic Lambda permissions**. Leave the **Advanced settings** section untouched and choose **Create functions**

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-4.png)

6. Wait a little bit for the Lambda Function to be provisioned.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-5.png)

7. Replace the Lambda `index.js` codes with the codes from bellow.
   
    ```
    const AWS = require('aws-sdk');

    const s3ObjectPath = '';
    const awsCloudFrontUrl = '';
    const amazonCloudFrontKeyPairId = '';
    const awsRegion = '';
    const awsSecretsManagerSecretName = '';
    const awsSecretsManagerSecretKeyName = '';

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
    ```

    There are 6 parametes you must fill for the function to work:
      + **s3ObjectPath**: Name of the object you push to S3 in step 2.1. If you store it in a subfolder, the path will be: <directory name>/<s3object>. In my case, this value is: **sebastian.jpg**
      + **awsCloudFrontUrl**: CloudFront Distribution URL you created in step 2.2. Format: dxxxxxxxxxz.cloudfront.net. (You don'd have to put **https://** in front of the CloudFront url)
      + **amazonCloudFrontKeyPairId**: Key group ID of the CloudFront public key group you created in step 3.1.
      + **awsRegion**: The region of Secret Manager you stored your secret in step 3.2.
      + **awsSecretsManagerSecretName**: Name of the Secret Manager in step 3.2.
      + **awsSecretsManagerSecretKeyName**: Name of the key of the private key you stored in Secret Manager in step 3.2.
  
    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-6.png)

8. **Save** and **Deploy** the function. Then you can create a **Test** event like bellow.
   ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-8.png)

9. After creating a test event. You can run **Test** to check if the function works. However, you will get the error like this:
    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-7.png)

    You know why? Because we have not added the permission to read the Secret from **Secret Manager** to **Lambda Function** execution role.

10. Since the newly created Lambda role does **NOT** have permission to access **AWS Secrets Manager**, you will need to update the role in [IAM](https://console.aws.amazon.com/iam). To quickly update this role, follow the step in the image bellow:

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-9.png)

11. After navigating to the role needed to modify, choose **Add permission** -> **Create inline policy**.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-10.png)

12. In the **Specify permissions** window, change to **JSON** view.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-11.png)

    Then copy and paste the policy bellow. Remember to change the resource arn to the arn of the Secret you created in Secret Manager in step 3.2.

    ```
    {
        "Effect": "Allow",
        "Action": "secretsmanager:GetSecretValue",
        "Resource": "arn:aws:secretsmanager:us-west-2:8xxxxxxxxxx6:secret:your_secret_name"
    }
    ```

13. Choose **Next** to continue. In **Review and create** window, give the newly created policy a name and review the options. Choose **Create policy** to finish.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-12.png)

14. Return to your Lambda Function and run the **Test** again. If you set up correctly, the result will be looked like that:

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-13.png)

    In the log window, you will get the signed URL. Copy this URL and paste to your browser, this time you will be able to access your image stored in S3.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-14.png)

15. Refresh the URL above after 5 minutes and you will get the error. Because we set the expired time to 5 minutes, after that amount of time, the URL will no longer work.

    ![lambda](/SignCloudFrontUrlWithLambdaFunction/images/4-lambdaFunction/04-lambda-15.png)
