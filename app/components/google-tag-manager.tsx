import Script from "next/script";

const GTM_ID = "GTM-554XJ9HG";

export function GoogleTagManager() {
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
