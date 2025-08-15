export function getBodyScrollAmount() {
  const body = document.body;
  const scrollTop = body.scrollTop
  const amount = scrollTop / body.scrollHeight
  return amount
}
