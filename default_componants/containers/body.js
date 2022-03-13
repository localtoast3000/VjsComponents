export default function Body(children) {
  const body = document.querySelector('body');
  if (children) {
    for (let child of children) {
      body.appendChild(child);
    }
  }
  return body;
}
