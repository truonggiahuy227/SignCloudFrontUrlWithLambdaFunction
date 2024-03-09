---
title : "Create Secrets Manager"
date : "`r Sys.Date()`"
weight : 1
chapter : false
pre : " <b> 3.2 </b> "
---

In this step you will push secret key to **AWS Secrets Manager**. Up to this point, you have used **Amazon S3** and **Amazon CloudFront**, which are AWS global services. As **AWS Secrets Manager** and **AWS Lambda** are regional services, you will need to pick an AWS **region** to use for the remainder of this sample. In this Lab, I use **us-east-1**.

### Create a Secret

1. Navigate to [AWS Secrets Manager Management Console](https://us-east-1.console.aws.amazon.com/secretsmanager).

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-1.png)

2. Choose **Store a new secret**.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-2.png)

3. In the create secret window: 
      + In the **Select secret type** section, select **Other type of secrets**.
      + For **Specify the key/value pairs to be stored in this secret** select **Plaintext**.
      + In the **Key** field, enter the name of your secret key. For the **Value** field, copy and paste the contents of the private key in the file named **private_key.pem** from previous step. Remember to format the content of that file before storing to **Secret manager**.
      + Choose **Next**.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-3.png)

    To get the secret value like the picture above you need to format the value from **private_key.pem** file:

    ```
    awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' private_key.pem
    ```

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-9.png)

4. For **Secret name**, provide a name **SignedUrlPrivateKey**. For the **Descripton** field, enter **Signed Url Private Key**. Then scroll down and choose **Next**.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-4.png)

5. In the next window, leave the **Disable automatic rotation** checked. Then scroll down and choose **Next**.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-5.png)

6. Review all of the options again. Then move to the bottom of the page and choose **Store**.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-6.png)

7. Select your **Secret** to view the details.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-8.png)

8. Record both the **Secret name** and **Secret ARN**. You will need them for the next step.

    ![secret manager](/SignedUrlWithLambda/images/3-secureCloudFrontDistribution/03-secretManager-7.png)

In this step you configured **AWS Secrets Manager** to store the CloudFront private key to be consumed by a downstream client. Next you will configure an **AWS Lambda** function to generate CloudFront signed URLs.