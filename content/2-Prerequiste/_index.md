---
title : "Preparation "
date : "`r Sys.Date()`"
weight : 2
chapter : false
pre : " <b> 2. </b> "
---

{{% notice info %}}
You need to create a S3 bucket with a sample image and CloudFront distribution.
{{% /notice %}}

### Introduction

**Amazon Simple Storage Service (Amazon S3)** is a industry-leading object storage service known for its scalability, data reliability, security, and speed. It caters to businesses of all sizes and industries, allowing them to securely store and manage vast amounts of data for various purposes like data lakes, cloud-native applications, and mobile apps. S3 offers cost-effective storage options and user-friendly management tools, enabling users to optimize expenses, categorize data efficiently, and implement precise access controls to align with specific business, organizational, and compliance needs.

**Amazon CloudFront** is a web service designed to accelerate the delivery of both static and dynamic web content like HTML, CSS, JavaScript, and images to users. It operates through a global network of data centers known as **edge locations**. Requests from users are directed to the nearest edge location to minimize latency, ensuring optimal performance when delivering content.

### Architecture

![Overview](/SignedUrlWithLambda/images/signURL-2.png)

### Content

- [Prepare a S3 bucket](2.1-creates3bucket/)
- [Create CloudFront Distribution](2.2-createcloudfrontdistribution/)