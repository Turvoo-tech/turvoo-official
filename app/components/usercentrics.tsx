import Script from "next/script";
import { isLiveSite } from "../lib/is-live-site";

const SETTINGS_ID = "mJ69kbcSoXFPS_";

export function Usercentrics() {
  if (!isLiveSite()) {
    return null;
  }

  return (
    <>
      <Script
        id="usercentrics-autoblocker"
        src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
        strategy="beforeInteractive"
      />
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id={SETTINGS_ID}
        strategy="beforeInteractive"
        async
      />
    </>
  );
}
