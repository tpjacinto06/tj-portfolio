// Location state attached to every link inside the site. Its presence tells a
// page's BACK that the previous history entry is ours, so it can step back to
// exactly where the visitor came from (EVERYTHING rather than MANUFACTURED,
// say). Without it the visitor arrived from outside — a shared link, a
// bookmark — and BACK goes up to the page's parent instead.
export const IN_APP = { inApp: true };
