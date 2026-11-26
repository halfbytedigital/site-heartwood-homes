export default async function (p, { pause }) {
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 80)); } });
  await pause(800);
}
