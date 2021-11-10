import AWS from "aws-sdk";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

import { REGION, IDENTITY_POOL_ID } from "./config.js";

export const getV2Response = async (clientParams) => {
  const client = new AWS.DynamoDB(clientParams);
  return client.listTables().promise();
};

export const getV3Response = async (clientParams) => {
  const client = new DynamoDB(clientParams);
  return client.listTables({});
};

export const getV2BrowserResponse = async () =>
  getV2Response({
    region: REGION,
    credentials: await new AWS.CognitoIdentityCredentials({
      region: REGION,
      IdentityPoolId: IDENTITY_POOL_ID,
    }).getPromise(),
  });

export const getV3BrowserResponse = async () =>
  getV3Response({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({
        region: REGION,
      }),
      identityPoolId: IDENTITY_POOL_ID,
    }),
  });
