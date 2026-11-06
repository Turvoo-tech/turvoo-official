export function isLiveSite() {
  const targetEnvironment = process.env.VERCEL_TARGET_ENV;

  if (targetEnvironment) {
    return targetEnvironment === "production";
  }

  return process.env.VERCEL_ENV === "production";
}
