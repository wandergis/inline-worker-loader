// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

const URL = window.URL || window.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      let blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        const BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }
      return URL.createObjectURL(blob);
      // return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return `data:application/javascript,${encodeURIComponent(content)}`;
      // return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }
    return url;
    // return new Worker(url);
  }
};
