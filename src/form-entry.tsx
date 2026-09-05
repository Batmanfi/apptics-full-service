import * as React from "react";
import { createRoot } from "react-dom/client";
import AppticsForm from "./AppticsForm";

declare global {
  interface Window {
    mountAppticsForm?: () => void;
  }
}

let formRoot: ReturnType<typeof createRoot> | null = null;

window.mountAppticsForm = () => {
  const host = document.getElementById("apptics-form-root");
  if (!host || formRoot) return;

  const disqualifiedUrl = new URL("dq/", document.baseURI).toString();
  formRoot = createRoot(host);
  formRoot.render(<AppticsForm disqualifiedUrl={disqualifiedUrl} />);
};
