"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");

const config = new pulumi.Config('infra')
let envName = config.require('envName')
let uiDomain = config.require('uiDomain')
let certificateArn = config.require('certificateArn')

// Create an AWS resource (S3 Bucket)
const uiContentBucket = new aws.s3.Bucket(`${envName}-ui-content-bucket`, {
  website: { indexDocument: 'index.html' }
});
exports.uiContentBucketName = uiContentBucket.id;
exports.uiContentBucketEndpoint = pulumi.interpolate`http://${uiContentBucket.websiteEndpoint}`;

const logBucket = new aws.s3.Bucket(`${envName}-request-logs`, {
  acl: "private",
});

const aliases = uiDomain.split('.').length == 2 
                  ? [uiDomain, `www.${uiDomain}`] 
                  : [uiDomain]

const cdnDistro = new aws.cloudfront.Distribution(`${envName}-distribution`, {
  enabled: true,
  aliases,
  origins: [{
    originId: uiContentBucket.arn,
    domainName: uiContentBucket.websiteEndpoint,
    customOriginConfig: {
      originProtocolPolicy: "http-only",
      httpPort: 80,
      httpsPort: 443,
      originSslProtocols: ["TLSv1.2"],
    },
  }],

  // viewerCertificate: { cloudfrontDefaultCertificate: true },
  viewerCertificate: {
    // Per AWS, ACM certificate must be in the us-east-1 region.
    acmCertificateArn: certificateArn,
    sslSupportMethod: "sni-only",
  },

  defaultRootObject: "index.html",

  defaultCacheBehavior: {
    targetOriginId: uiContentBucket.arn,

    viewerProtocolPolicy: "redirect-to-https",
    allowedMethods: ["GET", "HEAD", "OPTIONS"],
    cachedMethods: ["GET", "HEAD", "OPTIONS"],

    forwardedValues: {
      cookies: { forward: "none" },
      queryString: false,
    },

    minTtl: 600,
    defaultTtl: 3600,
    maxTtl: 7200,
  },

  priceClass: "PriceClass_100",

  customErrorResponses: [
    { errorCode: 404, responseCode: 200, responsePagePath: "/index.html" },
    // S3 returns 403 when object isn't found 
    { errorCode: 403, responseCode: 200, responsePagePath: "/index.html" },
  ],

  loggingConfig: {
    bucket: logBucket.bucketDomainName,
    // False for now. Don't want to store anything sensitive in 
    // this bucket. Need to get a more sophisticated logging
    // aproach that can filter out sensitive stuff
    includeCookies: false,
    prefix: `${uiDomain}/`,
  },

  restrictions: {
    geoRestriction: {
      restrictionType: "none",
    },
  },
});
exports.cloudfrontDomain = cdnDistro.domainName;
