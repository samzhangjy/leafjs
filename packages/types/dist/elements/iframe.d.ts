import type { Element } from '../globals';

type iframeAttributes = [
  'align',
  'allow',
  'allowfullscreen',
  'allowpaymentrequest',
  'external_protocol_urls_blocked',
  'fetchpriority',
  'frameborder',
  'height',
  'loading',
  'longdesc',
  'marginheight',
  'marginwidth',
  'name',
  'referrerpolicy',
  'sandbox',
  'sandbox-allow-downloads',
  'sandbox-allow-modals',
  'sandbox-allow-popups',
  'sandbox-allow-popups-to-escape-sandbox',
  'sandbox-allow-presentation',
  'sandbox-allow-same-origin',
  'sandbox-allow-storage-access-by-user-activation',
  'sandbox-allow-top-navigation-by-user-activation',
  'scrolling',
  'src',
  'srcDoc',
  'width'
];

export type iframeElement = Element<iframeAttributes>;
