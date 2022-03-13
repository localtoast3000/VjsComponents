export default function Root(children) {
  const root = document.querySelector('.root');

  if (children) {
    for (let child of children) {
      root.appendChild(child);
    }
  }
  return root;
}
