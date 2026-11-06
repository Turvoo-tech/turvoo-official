import Script from "next/script";

const GTM_ID = "GTM-554XJ9HG";

function isLiveSite() {
  const targetEnvironment = process.env.VERCEL_TARGET_ENV;

  if (targetEnvironment) {
    return targetEnvironment === "production";
  }

  return process.env.VERCEL_ENV === "production";
}

export function GoogleTagManager() {
  if (!isLiveSite()) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-tag-manager-datalayer" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
      </Script>
    </>
  );
}
