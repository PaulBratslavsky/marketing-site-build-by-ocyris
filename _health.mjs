
const url = "http://localhost:3000";
(async () => {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    process.stdout.write(JSON.stringify({ status: res.status, ok: res.ok }));
  } catch (e) {
    process.stdout.write(JSON.stringify({ status: 0, ok: false, error: e.message }));
  }
})();
