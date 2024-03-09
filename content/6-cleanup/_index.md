---
title: "Clean up resources"
date: "`r Sys.Date()`"
weight: 6
chapter: false
pre: "<b>6. </b>"
---

We will take the following steps to delete the resources we created in this exercise.

#### Delete API Gateway

1. Go to [AWS API Gateway Management Console](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1).
   + Choose the API Gateway you created.
   + Select **Delete** option.
   + Type **Confirm** to confirm the deleteion.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-1.png)

#### Delete Lambda Function

1. Go to [AWS Lambda Management Console](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-east-1#/functions).
   + Choose the Lambda Function you created.
   + In the **Action** box, select **Delete**.
   + To confirm deletion, type **delete**.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-2.png)

   Deleting a function permanently removes the function code. The related logs, roles, test event schemas, and triggers are retained in your account.

2. Go to [IAM service management console](https://console.aws.amazon.com/iamv2/home#/home)
   + Click **Roles**.
   + In the search box, type the name of the Lambda Function you created. In my case, it is **signedUrlFunction**.
   + Click to select this role.
   + Click **Delete**, then enter the role name and click **Delete** to delete the role.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-3.png)

#### Delete Secret Manager

1. Go to [AWS Secrets Manager Management Console](https://us-east-1.console.aws.amazon.com/secretsmanager)
   + Choose the **Secret** you created.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-4.png)

   + Click on **Actions** menu, then chose **Delete** to delete.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-5.png)

   + To protect your secret from accidental deletions, you will have to wait at least 7 days before permanently deleting the secret.
   + Change to **7 days** and choose **Schedule deletion**.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-6.png)

#### Delete CloudFront

1. Go to [Amazon CloudFront Management Console](https://console.aws.amazon.com/cloudfront)
   + Choose the **CloudFront Distribution** you created.
   + First, you will have to disable the distribution. Because CloudFront must propagate this change to all edge locations, it might take a few minutes before the update is complete and you can delete your distribution.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-7.png)

   + After 5 minutes, you will be able to **Delete** the distribution. Confirm deletetion by choosing **Delete**
  
   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-8.png) 

#### Delete S3 bucket

1. Go to [S3 service management console](https://s3.console.aws.amazon.com/s3/home)
   + Click on the S3 bucket we created for this lab. (Example: huytg-exclusive-content )
   + Click **Empty**.
   + Enter **permanently delete**, then click **Empty** to proceed to delete the object in the bucket.
   + Click **Exit**.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-9.png)

2. After deleting all objects in the bucket, click **Delete**

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-10.png)

3. Enter the name of the S3 bucket, then click **Delete bucket** to proceed with deleting the S3 bucket.

   ![Clean](/SignCloudFrontUrlWithLambdaFunction/images/6.clean/06-clean-11.png)
