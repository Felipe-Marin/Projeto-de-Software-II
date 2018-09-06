importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.bootstrap.css",
    "revision": "46a18cea358250ebca28adcf454a791f"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.bootstrap.min.css",
    "revision": "ec687e922ba853fd5a94df215fd9ed99"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.foundation.css",
    "revision": "6044d3bbc88cd2f03ef1e37bd8d90c7a"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.foundation.min.css",
    "revision": "6127caab130d297093267470db9cdb1f"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.jqueryui.css",
    "revision": "576a6850acdcbfbc6ed94679c488bda5"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.jqueryui.min.css",
    "revision": "098fddb99ff364f379cbacd6d2024801"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.semanticui.css",
    "revision": "c2d55f33ba8406483f59ec1a8ba5f66e"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/dataTables.semanticui.min.css",
    "revision": "b642c7bb5e410654381db3223396b37a"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/jquery.dataTables_themeroller.css",
    "revision": "99fd601e55bde8813c8249fdd5b41c89"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/jquery.dataTables.css",
    "revision": "cee72b5514a5bd34a5ed7c33834c3c07"
  },
  {
    "url": "DataTables/DataTables-1.10.15/css/jquery.dataTables.min.css",
    "revision": "a904d00b1db0aa013674b9f7d48f7440"
  },
  {
    "url": "DataTables/DataTables-1.10.15/images/sort_asc_disabled.png",
    "revision": "d7dc10c78f23615d328581aebcd805eb"
  },
  {
    "url": "DataTables/DataTables-1.10.15/images/sort_asc.png",
    "revision": "9326ad44ae4bebdedd141e7a53c2a730"
  },
  {
    "url": "DataTables/DataTables-1.10.15/images/sort_both.png",
    "revision": "9a6486086d09bb38cf66a57cc559ade3"
  },
  {
    "url": "DataTables/DataTables-1.10.15/images/sort_desc_disabled.png",
    "revision": "bda51e15154a18257b4f955a222fd66f"
  },
  {
    "url": "DataTables/DataTables-1.10.15/images/sort_desc.png",
    "revision": "1fc418e33fd5a687290258b23fac4e98"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.bootstrap.js",
    "revision": "83b18e708e2df1204e52243778f64754"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.bootstrap.min.js",
    "revision": "19b11075f9b46a3cd26fb39a6f252b5d"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.foundation.js",
    "revision": "a5ac6fff47d1c3dfc12432740b42586e"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.foundation.min.js",
    "revision": "a6641a2eccd8f4d087f87c1b3cea0cba"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.jqueryui.js",
    "revision": "7b83d5f2cbd03fcd7a7ed6dc3824ad10"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.jqueryui.min.js",
    "revision": "61d20aa3ba2c35ed1fa355d243fd8d05"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.semanticui.js",
    "revision": "bfa33f0d01544b2c38a0a7a2b72a8309"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/dataTables.semanticui.min.js",
    "revision": "cb56ec763e6f92bd82962427d3324cab"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/jquery.dataTables.js",
    "revision": "044934c251ffc436938954423bad04c0"
  },
  {
    "url": "DataTables/DataTables-1.10.15/js/jquery.dataTables.min.js",
    "revision": "bcf14f55a3878cef5e522906ce13235b"
  },
  {
    "url": "DataTables/datatables.css",
    "revision": "26ea339c1ec2efc05a971391b41bb6eb"
  },
  {
    "url": "DataTables/datatables.js",
    "revision": "9dfd1fbdbbe4d81bfa11bc1dff23e324"
  },
  {
    "url": "DataTables/datatables.min.css",
    "revision": "f8e5c6e2e3ad3e3ec3974e8f76f5ee3e"
  },
  {
    "url": "DataTables/datatables.min.js",
    "revision": "b26d5088dbaae283f50a7349ece0e63a"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.bootstrap.css",
    "revision": "7638a8c1029531eaa46f5dba647a7459"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.bootstrap.min.css",
    "revision": "78150a090846e99391da26abdde754c0"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.dataTables.css",
    "revision": "7d07d87743572013c8549dcc85941909"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.dataTables.min.css",
    "revision": "04c6eef58f2710bfa5dc23247d61d32c"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.foundation.css",
    "revision": "3e7cf137bd68dbc8a17b08c8e332cd12"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.foundation.min.css",
    "revision": "5151c4e1211f25cfacb6c934242d1062"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.jqueryui.css",
    "revision": "7d07d87743572013c8549dcc85941909"
  },
  {
    "url": "DataTables/Responsive-2.1.1/css/responsive.jqueryui.min.css",
    "revision": "04c6eef58f2710bfa5dc23247d61d32c"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/dataTables.responsive.js",
    "revision": "490b9dc1e4773fcf3a9a71e1d833bf29"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/dataTables.responsive.min.js",
    "revision": "7ccda93e38c3787830a151865f9eb1af"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/responsive.bootstrap.js",
    "revision": "c0b1a73ebac8ad36983b836d0b05d5e6"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/responsive.bootstrap.min.js",
    "revision": "e64bb08090f483a067ea8eebb849cdc1"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/responsive.foundation.js",
    "revision": "9ab01c997dab2e1981ab43d0102008e5"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/responsive.foundation.min.js",
    "revision": "943047c99587f0078800a328baee3832"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/responsive.jqueryui.js",
    "revision": "b3be084406141850b5a07f0215460f33"
  },
  {
    "url": "DataTables/Responsive-2.1.1/js/responsive.jqueryui.min.js",
    "revision": "4216eaba831080b1b916e76ecf4e0612"
  },
  {
    "url": "favicon.ico",
    "revision": "fb251fedd04c337d15026859e19a9e5b"
  },
  {
    "url": "fonts/roboto/Roboto-Bold.woff",
    "revision": "eed9aab5449cc9c8430d7d258108f602"
  },
  {
    "url": "fonts/roboto/Roboto-Bold.woff2",
    "revision": "c0f1e4a4fdfb8048c72e86aadb2a247d"
  },
  {
    "url": "fonts/roboto/Roboto-Light.woff",
    "revision": "ea36cd9a0e9eee97012a67b8a4570d7b"
  },
  {
    "url": "fonts/roboto/Roboto-Light.woff2",
    "revision": "3c37aa69cd77e6a53a067170fa8fe2e9"
  },
  {
    "url": "fonts/roboto/Roboto-Medium.woff",
    "revision": "cf4d60bc0b1d4b2314085919a00e1724"
  },
  {
    "url": "fonts/roboto/Roboto-Medium.woff2",
    "revision": "1561b424aaef2f704bbd89155b3ce514"
  },
  {
    "url": "fonts/roboto/Roboto-Regular.woff",
    "revision": "3cf6adf61054c328b1b0ddcd8f9ce24d"
  },
  {
    "url": "fonts/roboto/Roboto-Regular.woff2",
    "revision": "5136cbe62a63604402f2fedb97f246f8"
  },
  {
    "url": "fonts/roboto/Roboto-Thin.woff",
    "revision": "44b78f142603eb69f593ed4002ed7a4a"
  },
  {
    "url": "fonts/roboto/Roboto-Thin.woff2",
    "revision": "1f35e6a11d27d2e10d28946d42332dc5"
  },
  {
    "url": "images/chrome1.png",
    "revision": "f74abab4e22116ba54db980900e88126"
  },
  {
    "url": "images/chrome2.png",
    "revision": "9b47c5fbc2f85ebe0a78a3d0202db4bc"
  },
  {
    "url": "images/firefox1.png",
    "revision": "b5b1cb748b9537a62cf02e05f0fce383"
  },
  {
    "url": "images/firefox2.png",
    "revision": "0c45914097b6dbb7d10278154e14bf2c"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "8c60df7664ed1c1e5300f6c9cbf1447a"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "97f120e12f907466d19cec233eb44fca"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "3a46dfd4af1e5cb909adf315c375ec70"
  },
  {
    "url": "images/lixeiracinza.png",
    "revision": "57a9948edc1f33e070b74488e4f6206d"
  },
  {
    "url": "images/lixeiramarrom.png",
    "revision": "bcee9e174a45a4399d16482a5c96ae73"
  },
  {
    "url": "images/lixeiraverde.png",
    "revision": "c20cf01904a1172f5a8e0e1e3d7ea2b3"
  },
  {
    "url": "images/mapicon_eletronico.png",
    "revision": "b98e5b3d6f6b04c567df97e4398a5b08"
  },
  {
    "url": "images/mapicon_reciclavel.png",
    "revision": "03a8e3e180715f4e50d2e1635ff7a0de"
  },
  {
    "url": "images/tonelazul.png",
    "revision": "402f274eafb5202c6aac09feb8fc8728"
  },
  {
    "url": "images/tonelverde.png",
    "revision": "8acbdc3647d7b7dc1b4aad74432ee649"
  },
  {
    "url": "images/uma.png",
    "revision": "1753ad873bbd17c8ccedd1d9629014d1"
  },
  {
    "url": "index.html",
    "revision": "92db15083ecbcf823058377a80504aee"
  },
  {
    "url": "manifest.json",
    "revision": "6b1f5c36f1ba36a760a9c42c4c0b5296"
  },
  {
    "url": "scripts/initialize.js",
    "revision": "dd804d856268b83c3a93d5abe2081e4b"
  },
  {
    "url": "scripts/jquery-1.12.4.js",
    "revision": "fb2d334dabf4902825df4fe6c2298b4b"
  },
  {
    "url": "scripts/jquery.dataTables.min.js",
    "revision": "114c26084cb472c6a5f8b58908472ad7"
  },
  {
    "url": "scripts/map.js",
    "revision": "48deb370741e1614a8795f106dc7cf30"
  },
  {
    "url": "scripts/materialize.js",
    "revision": "e97da5c8b60e6673b98b286c2acf437d"
  },
  {
    "url": "scripts/materialize.min.js",
    "revision": "72604b4dd26e411dd6d7290b9f6c1d9c"
  },
  {
    "url": "scripts/search.js",
    "revision": "7a5ba49450be8ccf808fe70386beefb4"
  },
  {
    "url": "styles/jquery.dataTables.min.css",
    "revision": "01660835fe229de543497371787d0c8e"
  },
  {
    "url": "styles/materialize.css",
    "revision": "a493a025029b0a4e35b914f9f68a08a8"
  },
  {
    "url": "styles/materialize.min.css",
    "revision": "df8ee5622d9d736da06a6b0e7afdef55"
  },
  {
    "url": "styles/search.css",
    "revision": "23c60b42e884171a01620798a04b2081"
  },
  {
    "url": "teste.html",
    "revision": "cf67c81a7b0f83015562a54dc45231cc"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('https://spreadsheets.google.com/*', workboxSW.strategies.networkFirst({}), 'GET');
