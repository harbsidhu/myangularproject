#!/bin/bash

# Colours for ECHO
GREEN='\033[0;32m'
NOCOLOR='\033[0m'
ECHODONE="${GREEN}Done${NOCOLOR}"

# Configuration
S3BUCKET='aspire-cloudfront-production'
DISTRIBUTIONID='EZK74KI7PWZEO'

pushd dist

# Upload to S3
echo "Uploading to S3..."
aws s3 sync . s3://${S3BUCKET}
echo -e $ECHODONE

# Invalidate Cloudfront
echo "Invalidating cache..."
output=`aws cloudfront create-invalidation --distribution-id ${DISTRIBUTIONID} --paths "/*"`
echo $output
echo -e $ECHODONE

popd
