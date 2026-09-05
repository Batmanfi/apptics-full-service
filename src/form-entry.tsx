import * as React from "react";
import { createRoot } from "react-dom/client";
import AppticsForm from "./AppticsForm";

const host = document.getElementById("apptics-form-root");

if (host) {
  createRoot(host).render(<AppticsForm disqualifiedUrl="/dq/" />);
}
