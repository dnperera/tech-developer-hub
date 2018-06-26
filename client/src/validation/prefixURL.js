const checkURLProtocall = url => {
  //check url starts with http
  if (!url.startsWith("http")) {
    return `http://${url}`;
  }
  return url;
};

export default checkURLProtocall;
