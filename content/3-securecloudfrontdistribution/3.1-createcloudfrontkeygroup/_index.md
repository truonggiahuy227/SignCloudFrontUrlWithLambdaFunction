---
title : "Create CloudFront Key Group"
date : "`r Sys.Date()`"
weight : 1
chapter : false
pre : " <b> 3.1 </b> "
---


In this step you generated a public-private key pair, created a **CloudFront Key group** with a public key, and associated the Key group to your CloudFront distribution.

### Generate a key pair

First you will create a public-private key pair. The key pair must meet the following requirements:

+ It must be an SSH-2 RSA key pair.
+ It must be in base64-encoded PEM format.
+ It must be a 2048-bit key pair.

1. Generate an RSA key pair with a length of 2048 bits and save to the file named `private_key.pem`.

    ```
    openssl genrsa -out private_key.pem 2048
    ```

2. Next, we will extract the public key from the file `private_key.pem` and save to the file named `public_key.pem`.

    ```
    openssl rsa -pubout -in private_key.pem -out public_key.pem
    ```
    The resulting file will contains both the public and the private key.
    ![key pair](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-genkey-2.png)

### Upload Public Key

1. Navigate to [Amazon CloudFront Management Console](https://console.aws.amazon.com/cloudfront)

    ![cloudfront](/SignedUrlWithLambda/images/2.prerequisite/04-setup-cloudfront-1.png)

2. In the navigation menu, choose **Public keys**.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-1.png)

3. Choose **Create public key**.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-2.png)

4. In the **Create public key** window:
     + For **Key name** field, type a name to identify the public key. For example: **SignedUrlPublicKey**
     + For **Description** field, type a short description to describe the public key.  For example: **Signed Url Public Key**
     + For **Key value** field, copy and paste the contents of the public key from the file `public_key.pem` you created in the previous step.
     + Finally, click on **Create public key**.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-3.png)

{{% notice info %}}
How to get the content of your public key.
{{% /notice %}}

```
$ cat public_key.pem
```
![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-4.png)

5. Rememmber this public **Key ID**. You will use it later section.
    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-5.png)

### Create Key group

1. Navigate to [Amazon CloudFront Management Console](https://console.aws.amazon.com/cloudfront). On the left navigation, scroll down to **Key management** section, choose **Key groups**.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-6.png)

2. Choose **Create key group**.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-7.png)

3. On the **Create key group** page, do the following:
    + In the **Key group name** field, type the name of the key group. For example: **SignedUrlKeyGroup**
    + For the **Description** field, type a comment to describe the key group. For example: **Signed Url Key Group**
    + For **Public keys**, select the public key you created on the previous step to add to the key group by choosing its ID.
    + Choose **Create key group**.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-8.png)

4. Rememmber this key group ID.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-9.png)

### Associate Key group

Next we will secure the Amazon CloudFront distribution to restrict public access.

1. In the navigation menu, choose **Distributions**. Click on the **Distribution ID** of the distribution you created before.
  
    ![cloudfront](/SignedUrlWithLambda/images/2.prerequisite/04-setup-cloudfront-8.png)

2. Navigate to the **Behaviors** tab. Select the default **Origin or Origin Group** and then, choose **Edit**.

    ![cloudfront](/SignedUrlWithLambda/images/2.prerequisite/04-setup-cloudfront-15.png)

3. Scroll down to **Restrict Viewer Access (Use Signed URLs or Signed Cookies)** section: 
   + Choose **Yes** to expand the **Trusted Key Groups or Trusted Signer** option. 
   + Under **Trusted Key Groups or Trusted Signer**, select **Trusted Key Groups**.
   + In the **Add key groups** field, choose the key group from the previous step.

    ![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-10.png)

4. Scroll down to the bottom of the page, choose **Save changes**.

    ![cloudfront](/SignedUrlWithLambda/images/2.prerequisite/04-setup-cloudfront-17.png)

### Test new distribution

Now verify that the distribution is restricted. Refresh the image or reopen the URL https://dxxxxxxxxxz.cloudfront.net/<Your image you push to S3 in the previous step>, you should see the error message as bellow:

![key group](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-createKeyGroup-11.png)