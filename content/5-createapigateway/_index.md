---
title : "Create API Gateway "
date : "`r Sys.Date()`"
weight : 5
chapter : false
pre : " <b> 5. </b> "
---

### Introduction

**AWS API Gateway** is a fully managed service that enables developers to create, publish, maintain, monitor, and secure APIs at any scale. It acts as a front door for applications to access data, business logic, or functionality from backend services, such as AWS Lambda functions, Amazon EC2 instances, or other HTTP endpoints.

In the previous step, to get a signed URL you have to trigger **Lambda Function**. In this step you will create **AWS API Gateway** and connect to **AWS Lambda Function** to get signed URL for you.

### Architecture

![Overall](/images/signURL-4.png)

### Create API Gateway

1. From your AWS management console and navigate to the [AWS API Gateway Management Console](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1).

    ![API Gateway](/images/5-apiGateway/05-apigw-1.png)

2. You will be routed to the **Create API** window. From there, scroll down to **REST API** section, choose **Build**.

    ![API Gateway](/images/5-apiGateway/05-apigw-2.png)

3. From the **Create REST API** window:
      + Select **New API**.
      + For **API name** field, provide a name. For example: `Sign URL API`.
      + For **Description** field, you can describe your API like: `API used to get signed URL`.

    ![API Gateway](/images/5-apiGateway/05-apigw-3.png)

4. Scroll down and choose **Create**. Wait a little for your API to be created.
5. In the **Resources** window, choose **Create method**.

    ![API Gateway](/images/5-apiGateway/05-apigw-4.png)

6. In the **Create method** window:
      + For the **Method type** field, select **GET**.
      + For the **Integration type** field, select **Lambda function**.
      + For the **Lambda function** field, select the **Region** you deployed your Lambda Function in step 4 and select the right **arn** of that function.
      + Scroll down to the bottom and select **Create**

    ![API Gateway](/images/5-apiGateway/05-apigw-5.png)

7. Now, let deploy your newly created API by selecting **Deploy API**

    ![API Gateway](/images/5-apiGateway/05-apigw-6.png)

8. In the **Deploy API** poped up window:
      + For the **Stage** field, select **New stage**.
      + For the **Stage name** field, enter `testStage`.
      + For the **Deployment description** field, enter `API gets CloudFront signed URL`.
      + Select **Deploy**.

    ![API Gateway](/images/5-apiGateway/05-apigw-8.png)

9. You will be navigated to the **Stage** screen of this API Gateway. Copy the **invoke url** and paste it to a new tab in your browser. (You can use another tools like Postman to call that API).

    ![API Gateway](/images/5-apiGateway/05-apigw-9.png)

10. You will get the **CloudFront signed URL** to get the image stored in S3.

    ![API Gateway](/images/5-apiGateway/05-apigw-10.png)

11. Copy that URL and paste to a new tab.

    ![API Gateway](/images/5-apiGateway/05-apigw-11.png)

Now, you can call the API to get the CloudFront signed URL of the image stored in S3.
