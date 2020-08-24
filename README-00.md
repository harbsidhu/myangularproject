# Introduction

This is the Angular front end for ASPIRE portal.

# Build Status

[![build status](https://github.com/aspiresmeco/aspire.ui/workflows/Build/badge.svg)](https://github.com/aspiresmeco/aspire.ui/actions)

# Deploy

## Deploy to test-portal.aspiresme.com

1. `./build-test.sh`
2. `./deploy-test.sh`
3. Wait for CF cache to invalidate.

## Deploy to portal.aspiresme.com

1. `./build-production.sh`
2. `./deploy-production.sh`
3. Wait for CF cache to invalidate.

## Notes

You have to build and then deploy for each environment as the backend REST API url is embeded in the build files.

**To avoid linting issues preventing pushing code changes run:**

 `git push --no-verify`
