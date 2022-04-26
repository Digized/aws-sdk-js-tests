import AWS, { AutoScaling } from "aws-sdk";

// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { DynamoDB } from "@aws-sdk/client-dynamodb";

// import { REGION, IDENTITY_POOL_ID } from "./config.js";

import creds from "./awscredentials.json";
import example from "./example.json";
export const getV2Response = async (clientParams) => {
  const client = new AWS.S3({
    ...creds,
    endpoint: "s3.us-east-1.amazonaws.com",
    region: "us-east-1",
  });

  const bucket = "twinmaker-workspace-test123-429447376863-iad";
  const key = "test.json";
  await client
    .putObject({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(example),
    })
    .promise();
  await client.headObject({ Bucket: bucket, Key: key }).promise();
  await client
    .putObject({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(example),
    })
    .promise();
  await waitfor(2);
  await client.headObject({ Bucket: bucket, Key: key }).promise();

  return Promise.resolve();
  // return client.listTables().promise();
};

const waitfor = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

export const getV3Response = async (clientParams) => {
  // const client = new DynamoDB(clientParams);
  // return client.listTables({});
};

export const getV2BrowserResponse = async () => {
  return getV2Response();
};

export const getV3BrowserResponse = async () => getV3Response({});
