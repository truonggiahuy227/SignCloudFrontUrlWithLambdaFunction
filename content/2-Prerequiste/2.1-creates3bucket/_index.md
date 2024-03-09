---
title : "Preparing a S3 bucket"
date : "`r Sys.Date()`"
weight : 1
chapter : false
pre : " <b> 2.1 </b> "
---

In this step, we will create a private Amazon S3 bucket and upload an image to that bucket.

Note: Amazon S3 routes any virtual hosted–style requests to the US East (N. Virginia) region by default if you use the US East (N. Virginia) endpoint (s3.amazonaws.com). When you create a new bucket, in any region, Amazon S3 updates DNS to reroute the request to the correct region, which might take time when using Amazon CloudFront for distribution in later section. For the purpose of this exercise, you will create a new bucket in AWS region us-east-1. Detailed explanation of AWS Virtual hosting of buckets is provided in AWS User Guide.

#### Create S3 Bucket

1. Go to [Amazon S3 management console](https://s3.console.aws.amazon.com/s3/home)
      + Click **Buckets**.
      + Click **Create bucket**.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/01-create-bucket.png)

2. At the **Create bucket** page.
      + In the **AWS Region** field, select **US East (N. Virginia) us-east-1**.
      + In the **Bucket type** field, select **General purpose**.
      + In the **Bucket name** field, enter your bucket name. (Example: **<yourname>-exclusive-content**)
      + Leave other fields as default.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/02-configure-bucket-1.png)

3. Scroll to the bottom of the page, click **Create bucket**.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/02-configure-bucket-2.png)

4. Choose the bucket you have just created by clicking on its name.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-1.png)

5. Choose **Upload**.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-2.png)

6. Choose **Add files**. Select an image on your computer to upload.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-3.png)

7. Your image you choose will be shown on the screen. Click **Upload** to upload your image to S3 bucket.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-4.png)

8. After your image is uploaded successfully, click **Return** to return to your bucket.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-5.png)

9. To view the detail of the object you have just uploaded, click on the object name.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-6.png)

10. If you try to access the image using the **Object URL** you will get an access denied message. This is exactly what we want. We want to keep your S3 contents private and will only distribute them using an Amazon CloudFront distribution.
  ![S3](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/03-upload-content-7.png)

In the next step, you will create the **Amazon CloudFront Distribution**.