---
title : "Introduction"
date :  "`r Sys.Date()`" 
weight : 1 
chapter : false
pre : " <b> 1. </b> "
---

### Introduction

Many companies that distribute content over the internet want to restrict access to documents, business data, media streams, or content that is intended for selected users, for example, users who have paid a fee. To securely serve this private content by using CloudFront, you can do the following:

- Require that your users access your private content by using special CloudFront signed URLs or signed cookies.
- Require that your users access your content by using CloudFront URLs, not URLs that access content directly on the origin server (for example, Amazon S3 or a private HTTP server). Requiring CloudFront URLs isn't necessary, but we recommend it to prevent users from bypassing the restrictions that you specify in signed URLs or signed cookies.

A **signed URL** includes additional information, for example, an expiration date and time, that gives you more control over access to your content.

By using **signed URL**, you get the following advantages:

- Restricting access to files in CloudFront caches.
- Restricting access to files in Amazon S3 buckets. (What we will do in this lab)
- Restricting access to files on custom origins.
  
### Overview architechture

![Overview](/SignCloudFrontUrlWithLambdaFunction/images/signURL-1.png)

1. User will call a GET API provided by **API Gateway**.
2. **API Gateway** will trigger **Lambda Function**.
3. **Lambda Function** then retieve private key from **Secret Manager**.
4. **Lambda Function** uses that secret key to create a signed URL from **CloudFront Distribution URL** and return this URL back to user.
5. User now can access the S3 contents using provided URL.
