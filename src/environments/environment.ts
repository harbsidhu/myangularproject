/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  test: false,
  base_url: 'http://localhost:5001',
  mediaBucketName: 'aspire-test-images-originals',
  mediaBaseUrl: 'https://test-media.aspiresme.com',
  // The test GA key
  googleAnalyticsKey: 'UA-161682484-2',
  addressFinderKey: 'VNAFD7MLGB8WY34TUXEH',
  abn_api_url: 'https://abr.business.gov.au/json/AbnDetails.aspx',
  acn_api_url: 'https://abr.business.gov.au/json/AcnDetails.aspx',
  api_config_extension: '/api/auth/config',
  stripeKey: 'pk_test_xjKwZDRvUPBlmzOpaxuhbdAe00VzTKBd2A',
};
