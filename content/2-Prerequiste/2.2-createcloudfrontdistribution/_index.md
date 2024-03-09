---
title : "Create CloudFront Distribution"
date : "`r Sys.Date()`"
weight : 2
chapter : false
pre : " <b> 2.2 </b> "
---

### Create Amazon CloudFront Distribution

In this step, we will create a CloudFront distribution with the S3 bucket from Step 1 as source. Access to the bucket will be restricted by using an [Origin Access Identity (OAI)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).

1. Navigate to the [Amazon CloudFront Management Console](https://console.aws.amazon.com/cloudfront).
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-1.png)

2. Choose **Create Distribution**.
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-2.png)

3. In the **Create distribution** window:
      + In the field **Origin Domain Name**, choose the S3 Bucket from Step 1.
      + In the field **Origin access**, choose **Origin access control settings**.
      + In the field **Origin access control**, choose **Create new OAC**.
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-3.png)

4. In the **Create new OAC** window:
      + In the field **Signing behavior**, choose **Sign requests**.
      + Leave **Do not override authorization header** unchecked.
      + Choose **Create** to continue.  
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-4.png)

5. Scroll down to **Web Application Firewall (WAF)**, select **Do not enable security protections**.
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-5.png)

6. Continue:
      + Leave every options left as default 
      + Scroll down to the bottom of the page and choose **Create Distribution**. You will have to wait around 5 minutes for your CloudFront distribution to be ready. 
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-6.png)

7. When your CloudFront distribution is ready, you can click on its name to view its information in details. 
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-7.png)
  Now we have to add a policy to S3 bucket to allow CloudFront Distribtuion get image from that bucket.

8. Click on the ID of the distribution you created.
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-8.png)

9. In the distribution view, choose **Origins** tab. Select the origin you just created and choose **Edit**.
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-9.png)

10. In the **Edit origin** view, choose **Copy policy** to copy the S3 bucket policy to your clipboard and click on **Go to S3 bucket permissions**.
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-10.png)

11. Scroll down to **Bucket policy** section, choose **Edit**
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-11.png)

12. In the Bucket polycy edit page, paste the policy you coppied to the **Policy** board and choose **Save changes**
  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-12.png)

13. Return to CloudFront distribution page, under **Domain Name** copy the FQDN, similar to the format `dxxxxxxxxxz.cloudfront.net`.

  ![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-13.png)

### Test the distribution

Now let's verify that the distribution is setup correctly and has access to the Amazon S3 contents.

Use your browser and enter the URL https://dxxxxxxxxxz.cloudfront.net/<Your image you push to S3 in the previous step>. Remember to replace the domain name with your FQDN. Your sample image should come up correctly. However, anyone have your URL can access your Amazon S3 contents.

![cloudfront](/SignCloudFrontUrlWithLambdaFunction/images/2.prerequisite/04-setup-cloudfront-14.png)

In the next step, we will secure the Amazon CloudFront distribution to restrict public access.
