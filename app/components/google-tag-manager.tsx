import Script from "next/script";
import { isLiveSite } from "../lib/is-live-site";

const GTM_ID = "GTM-554XJ9HG";

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
        async
      />
      <Script id="google-tag-manager-datalayer" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
      </Script>
    </>
  );
}
