"use client";

type UsercentricsCmp = {
  showSecondLayer: () => void;
};

function getUsercentricsCmp() {
  return (window as Window & { __ucCmp?: UsercentricsCmp }).__ucCmp;
}

function openCookieSettings() {
  const cmp = getUsercentricsCmp();

  if (cmp) {
    cmp.showSecondLayer();
    return;
  }

  window.addEventListener(
    "UC_CMP_API_READY",
    () => {
      getUsercentricsCmp()?.showSecondLayer();
    },
    { once: true },
  );
}

export function CookieSettingsLink() {
  return (
    <a
      href="#cookie-settings"
      className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
      onClick={(event) => {
        event.preventDefault();
        openCookieSettings();
      }}
    >
      Cookie settings
    </a>
  );
}
