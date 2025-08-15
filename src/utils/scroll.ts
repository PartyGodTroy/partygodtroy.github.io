export function getWindowScrollAmount() {
  const docElem = window.document.documentElement;
  const docBody = window.document.body;
  const scrollTop =
    window.pageYOffset || docElem.scrollTop || docBody.scrollTop;
  const scrollBottom =
    (docElem.scrollHeight || docBody.scrollHeight) - window.innerHeight;
  const scrollPercent = scrollTop / scrollBottom || 0;
  return scrollPercent;
}
