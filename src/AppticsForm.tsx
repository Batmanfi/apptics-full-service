import * as React from "react";

const APPTICS_API_URL = "https://apptics-application.kanishqfunnels.chatgpt.site";
const CAL_BOOKING_URL = "https://cal.com/team/apptics/apptics-revenue-audit";
const DISQUALIFIED_URL = "https://fun-product-779362.framer.app/dq";
const FINAL_SAVE_GRACE_MS = 1200;

const revenueOptions = [
  { value: "under-25k", label: "$0 - $25,000/mo" },
  { value: "25k-50k", label: "$25,000 - $50,000/mo" },
  { value: "50k-100k", label: "$50,000 - $100,000/mo" },
  { value: "over-100k", label: "More than $100,000/mo" },
] as const;

type Answers = {
  isEcommerce?: boolean;
  name?: string;
  email?: string;
  website?: string;
  revenue?: string;
};

type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  referrer: string;
  landingPage: string;
  device: string;
};

export type AppticsFormProps = {
  apiBaseUrl?: string;
  calUrl?: string;
  disqualifiedUrl?: string;
  onSubmitted?: (payload: Record<string, unknown>) => void;
  onDisqualified?: () => void;
};

const questions = [
  {
    title: "Are you an e-commerce brand?",
    description: "this offer is ONLY for e-commerce businesses that sell products online.",
  },
  { title: "What is your name?*", description: "" },
  { title: "What is your email address?*", description: "" },
  { title: "What is your brand's website?*", description: "" },
  {
    title: "What is your current monthly revenue?",
    description:
      "We need to know the revenue number so that we can send you tailored SOPs and assets for your current revenue stage prior to our call taking place.",
  },
] as const;

const styles = `
.apptics-form, .apptics-form * { box-sizing: border-box; }
.apptics-form {
    --blue: #168ff5;
    --text: #2e2831;
    --muted: #5f5a61;
    --line: #8e8a8f;
    --choice: #f2f2f2;
    --heading-size: 28px;
    --body-size: 18px;
    position: relative;
    height: 100%;
    min-height: min(620px, 100dvh);
    width: 100%;
    display: grid;
    grid-template-rows: 4px 1fr auto;
    background: #fff;
    color: var(--text);
    font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.apptics-progress { background: #edf0f3; }
.apptics-progress > span {
    display: block;
    height: 100%;
    background: var(--blue);
    transition: width 220ms ease;
}
.apptics-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 48px 32px;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
}
.apptics-question {
    width: min(100%, 980px);
    flex: 0 0 auto;
    margin-block: auto;
    animation: apptics-in 220ms ease-out both;
}
.apptics-heading {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
}
.apptics-number {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    margin-top: 2px;
    border-radius: 5px;
    background: var(--text);
    color: #fff;
    font-size: 15px;
    font-weight: 700;
}
.apptics-heading h1 {
    margin: 0;
    font-size: var(--heading-size);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.25;
}
.apptics-heading p {
    max-width: 940px;
    margin: 12px 0 0;
    color: var(--muted);
    font-size: var(--body-size);
    line-height: 1.5;
}
.apptics-answer {
    max-width: 840px;
    margin: 32px 0 0 50px;
}
.apptics-input {
    width: 100%;
    padding: 12px 0 18px;
    border: 0;
    border-bottom: 2px solid var(--line);
    border-radius: 0;
    background: transparent;
    color: var(--text);
    font: inherit;
    font-size: var(--body-size);
    line-height: 1.5;
    outline: none;
}
.apptics-input::placeholder { color: #b8b6b9; opacity: 1; }
.apptics-input:focus { border-color: var(--blue); }
.apptics-choices {
    display: grid;
    max-width: 470px;
    gap: 10px;
    margin: 0;
    padding: 0;
    border: 0;
}
.apptics-choice {
    display: flex;
    min-height: 58px;
    align-items: center;
    gap: 12px;
    padding: 9px 14px;
    border: 1px solid #dfdfdf;
    border-radius: 12px;
    background: var(--choice);
    cursor: pointer;
    font-size: var(--body-size);
    line-height: 1.35;
    transition: border-color 120ms ease, background 120ms ease;
}
.apptics-choice:hover { border-color: var(--blue); }
.apptics-choice[data-selected="true"] {
    border-color: var(--blue);
    background: #edf6ff;
    box-shadow: inset 0 0 0 1px var(--blue);
}
.apptics-choice input { position: absolute; opacity: 0; pointer-events: none; }
.apptics-key {
    display: grid;
    width: 38px;
    height: 38px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #c9c9c9;
    border-radius: 7px;
    background: #fff;
    font-size: var(--body-size);
    font-weight: 600;
}
.apptics-check { margin-left: auto; color: var(--blue); font-weight: 800; }
.apptics-error {
    margin: 14px 0 0 66px;
    color: #ba303b;
    font-size: 14px;
}
.apptics-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 20px 0 0 50px;
}
.apptics-ok {
    min-width: 76px;
    height: 44px;
    padding: 0 18px;
    border: 0;
    border-radius: 9px;
    background: var(--blue);
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: var(--body-size);
    font-weight: 700;
}
.apptics-ok:disabled { cursor: wait; opacity: .65; }
.apptics-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 58px;
    padding: 12px 24px;
    border-top: 1px solid #eeeeee;
    color: #777;
    font-size: 13px;
}
.apptics-back {
    width: 34px;
    height: 34px;
    border: 1px solid #dedede;
    border-radius: 7px;
    background: #fff;
    cursor: pointer;
}
.apptics-back:disabled { cursor: default; opacity: .35; }
@keyframes apptics-in { from { opacity: 0; transform: translateY(8px); } }
@media (max-width: 640px) {
    .apptics-form {
        --heading-size: 22px;
        --body-size: 16px;
        min-height: min(560px, 100dvh);
    }
    .apptics-stage {
        padding: 24px 20px calc(24px + env(safe-area-inset-bottom));
    }
    .apptics-heading {
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
    }
    .apptics-number {
        width: 28px;
        height: 28px;
        margin-top: 3px;
        font-size: 14px;
    }
    .apptics-answer, .apptics-actions, .apptics-error { margin-left: 0; }
    .apptics-answer { margin-top: 24px; }
}
`;

function captureAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
      gclid: "",
      fbclid: "",
      msclkid: "",
      referrer: "",
      landingPage: "",
      device: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
    utmTerm: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
    msclkid: params.get("msclkid") || "",
    referrer: document.referrer,
    landingPage: window.location.href,
    device: window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
  };
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidWebsite(value: string) {
  try {
    return new URL(normalizeWebsite(value)).hostname.includes(".");
  } catch {
    return false;
  }
}

function isQualifiedApplicant(answers: Answers) {
  return answers.isEcommerce === true;
}

function createCalUrl(baseUrl: string, answers: Answers, attribution: Attribution) {
  const url = new URL(baseUrl);
  const values: Record<string, string | undefined> = {
    name: answers.name,
    email: answers.email,
    website: answers.website,
    utm_source: attribution.utmSource,
    utm_medium: attribution.utmMedium,
    utm_campaign: attribution.utmCampaign,
    utm_content: attribution.utmContent,
    utm_term: attribution.utmTerm,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
    msclkid: attribution.msclkid,
  };

  Object.entries(values).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function waitForFinalSave<T>(request: Promise<T>) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      request,
      new Promise<null>((resolve) => {
        timeoutId = setTimeout(() => resolve(null), FINAL_SAVE_GRACE_MS);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function AppticsForm({
  apiBaseUrl = APPTICS_API_URL,
  calUrl = CAL_BOOKING_URL,
  disqualifiedUrl = DISQUALIFIED_URL,
  onSubmitted,
  onDisqualified,
}: AppticsFormProps) {
  const [step, setStep] = React.useState(1);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [attribution] = React.useState(captureAttribution);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [emailLocked, setEmailLocked] = React.useState(false);
  const initializedRef = React.useRef(false);
  const startedRef = React.useRef(false);
  const inFlightRef = React.useRef(false);
  const submissionIdRef = React.useRef("");
  const sessionPromiseRef = React.useRef<Promise<string> | null>(null);
  const saveQueueRef = React.useRef<Promise<void>>(Promise.resolve());
  const stageRef = React.useRef<HTMLElement>(null);

  const apiUrl = React.useCallback(
    (path: string) => `${apiBaseUrl.replace(/\/$/, "")}${path}`,
    [apiBaseUrl],
  );

  const ensureSubmissionId = React.useCallback(() => {
    if (submissionIdRef.current) return Promise.resolve(submissionIdRef.current);
    if (sessionPromiseRef.current) return sessionPromiseRef.current;

    const request = fetch(apiUrl("/api/submissions"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attribution),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Session failed");
        return response.json() as Promise<{ id?: string }>;
      })
      .then((data) => {
        if (!data.id) throw new Error("Session failed");
        submissionIdRef.current = data.id;
        return data.id;
      })
      .catch((caught) => {
        sessionPromiseRef.current = null;
        throw caught;
      });

    sessionPromiseRef.current = request;
    return request;
  }, [apiUrl, attribution]);

  React.useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    void ensureSubmissionId().catch(() => setError("Please refresh and try again"));
  }, [ensureSubmissionId]);

  const track = React.useCallback(
    (eventType: string, questionId?: string, metadata?: Record<string, unknown>) => {
      const trackedSubmissionId = submissionIdRef.current;
      if (!trackedSubmissionId) return;
      void fetch(apiUrl("/api/events"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: trackedSubmissionId,
          eventType,
          questionId,
          metadata,
        }),
        keepalive: true,
      });
    },
    [apiUrl],
  );

  const markStarted = React.useCallback(() => {
    if (startedRef.current || !submissionIdRef.current) return;
    startedRef.current = true;
    track("form_started", "ecommerce");
  }, [track]);

  const updateAnswer = React.useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K]) => {
      markStarted();
      setError("");
      setAnswers((current) => ({ ...current, [key]: value }));
    },
    [markStarted],
  );

  const save = React.useCallback(
    async (
      nextAnswers: Answers,
      nextStep: number,
      options: { partial?: boolean; complete?: boolean } = {},
    ) => {
      const id = await ensureSubmissionId();
      const response = await fetch(apiUrl(`/api/submissions/${id}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          answers: nextAnswers,
          currentStep: nextStep,
          ...options,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        qualified?: boolean | null;
        error?: string;
      };
      if (!response.ok) throw new Error(result.error || "Please try again");
      return result;
    },
    [apiUrl, ensureSubmissionId],
  );

  const queueSave = React.useCallback(
    (
      nextAnswers: Answers,
      nextStep: number,
      options: { partial?: boolean; complete?: boolean } = {},
    ) => {
      const queued = saveQueueRef.current.then(() => save(nextAnswers, nextStep, options));
      saveQueueRef.current = queued.then(
        () => undefined,
        () => undefined,
      );
      return queued;
    },
    [save],
  );

  const validate = React.useCallback(() => {
    if (step === 1 && typeof answers.isEcommerce !== "boolean") return false;
    if (step === 2 && (!answers.name || answers.name.trim().length < 2)) return false;
    if (step === 3 && (!answers.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)))
      return false;
    if (step === 4 && !isValidWebsite(answers.website || "")) return false;
    if (step === 5 && !answers.revenue) return false;
    return true;
  }, [answers, step]);

  const submit = React.useCallback(
    async (submission: Answers) => {
      const qualified = isQualifiedApplicant(submission);
      const completionRequest = save(submission, step, { complete: true });
      const result = await waitForFinalSave(completionRequest);
      if (!result) void completionRequest.catch(() => undefined);
      track("question_answered", String(step));
      const payload: Record<string, unknown> = {
        submissionId: submissionIdRef.current,
        ...submission,
        qualified: result?.qualified ?? qualified,
      };
      onSubmitted?.(payload);

      if (result?.qualified ?? qualified) {
        window.location.assign(createCalUrl(calUrl, submission, attribution));
        return;
      }

      onDisqualified?.();
      window.location.assign(disqualifiedUrl);
    },
    [attribution, calUrl, disqualifiedUrl, onDisqualified, onSubmitted, save, step, track],
  );

  const next = React.useCallback(async () => {
    if (inFlightRef.current || loading || !validate()) {
      if (!loading) setError("This question is required");
      return;
    }

    inFlightRef.current = true;
    setError("");
    const terminal = (step === 1 && answers.isEcommerce === false) || step === 5;

    if (!terminal) {
      const nextStep = step + 1;
      if (step === 3) setEmailLocked(true);
      track("question_answered", String(step));
      track("question_viewed", String(nextStep));
      setStep(nextStep);
      if (step === 3) {
        void queueSave(answers, nextStep, { partial: true }).catch(() =>
          setError("Please try again"),
        );
      }
      return;
    }

    setLoading(true);
    try {
      await submit(answers);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again");
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  }, [answers, loading, queueSave, step, submit, track, validate]);

  const continueAfterChoice = React.useCallback(
    async (selection: Pick<Answers, "isEcommerce"> | Pick<Answers, "revenue">) => {
      if (inFlightRef.current || loading) return;

      const submission = { ...answers, ...selection };
      markStarted();
      setError("");
      setAnswers(submission);
      inFlightRef.current = true;

      const terminal = (step === 1 && submission.isEcommerce === false) || step === 5;
      if (!terminal) {
        const nextStep = step + 1;
        track("question_answered", String(step));
        track("question_viewed", String(nextStep));
        setStep(nextStep);
        return;
      }

      setLoading(true);

      try {
        await submit(submission);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Please try again");
      } finally {
        inFlightRef.current = false;
        setLoading(false);
      }
    },
    [answers, loading, markStarted, queueSave, step, submit, track],
  );

  React.useEffect(() => {
    inFlightRef.current = false;
  }, [step]);

  React.useEffect(() => {
    stageRef.current?.scrollTo({ top: 0 });
  }, [step]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        void next();
        return;
      }
      if (event.target instanceof HTMLInputElement) return;
      const key = event.key.toLowerCase();
      if (step === 1 && (key === "a" || key === "b")) {
        updateAnswer("isEcommerce", key === "a");
      }
      if (step === 5) {
        const index = ["a", "b", "c", "d"].indexOf(key);
        if (index >= 0) updateAnswer("revenue", revenueOptions[index].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, step, updateAnswer]);

  const question = questions[step - 1];

  return (
    <>
      <style>{styles}</style>
      <main className="apptics-form">
        <div className="apptics-progress" aria-label={`${step} of 5`}>
          <span style={{ width: `${step * 20}%` }} />
        </div>

        <section ref={stageRef} className="apptics-stage" key={step}>
          <div className="apptics-question">
            <div className="apptics-heading">
              <span className="apptics-number">{step}</span>
              <div>
                <h1>{question.title}</h1>
                {question.description ? <p>{question.description}</p> : null}
              </div>
            </div>

            <div className="apptics-answer">
              {step === 1 ? (
                <fieldset className="apptics-choices">
                  <legend style={{ position: "absolute", opacity: 0 }}>
                    Are you an e-commerce brand?
                  </legend>
                  <Choice
                    name="ecommerce"
                    shortcut="A"
                    selected={answers.isEcommerce === true}
                    onChange={() => {
                      void continueAfterChoice({
                        isEcommerce: true,
                      });
                    }}
                  >
                    Yes
                  </Choice>
                  <Choice
                    name="ecommerce"
                    shortcut="B"
                    selected={answers.isEcommerce === false}
                    onChange={() => {
                      void continueAfterChoice({
                        isEcommerce: false,
                      });
                    }}
                  >
                    No (exit this page)
                  </Choice>
                </fieldset>
              ) : null}

              {step === 2 ? (
                <input
                  className="apptics-input"
                  autoComplete="name"
                  value={answers.name || ""}
                  onChange={(event) => updateAnswer("name", event.target.value)}
                  placeholder="Type your answer here..."
                />
              ) : null}

              {step === 3 ? (
                <input
                  className="apptics-input"
                  type="email"
                  autoComplete="email"
                  readOnly={emailLocked}
                  value={answers.email || ""}
                  onChange={(event) => updateAnswer("email", event.target.value)}
                  placeholder="Type your answer here..."
                />
              ) : null}

              {step === 4 ? (
                <input
                  className="apptics-input"
                  type="url"
                  autoComplete="url"
                  value={answers.website || ""}
                  onChange={(event) => updateAnswer("website", event.target.value)}
                  placeholder="Type your answer here..."
                />
              ) : null}

              {step === 5 ? (
                <fieldset className="apptics-choices">
                  <legend style={{ position: "absolute", opacity: 0 }}>
                    What is your current monthly revenue?
                  </legend>
                  {revenueOptions.map((option, index) => (
                    <Choice
                      key={option.value}
                      name="revenue"
                      shortcut={String.fromCharCode(65 + index)}
                      selected={answers.revenue === option.value}
                      onChange={() => {
                        void continueAfterChoice({
                          revenue: option.value,
                        });
                      }}
                    >
                      {option.label}
                    </Choice>
                  ))}
                </fieldset>
              ) : null}
            </div>

            {error ? (
              <p className="apptics-error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="apptics-actions">
              <button
                className="apptics-ok"
                type="button"
                disabled={loading}
                onClick={() => void next()}
              >
                {loading ? "..." : step === 5 ? "Submit" : "OK"}
              </button>
            </div>
          </div>
        </section>

        <footer className="apptics-footer">
          <span>{step} of 5</span>
          <button
            className="apptics-back"
            type="button"
            aria-label="Previous question"
            disabled={step === 1 || loading}
            onClick={() => {
              track("back_clicked", String(step));
              setError("");
              setStep((current) => Math.max(1, current - 1));
            }}
          >
            ←
          </button>
        </footer>
      </main>
    </>
  );
}

function Choice({
  name,
  shortcut,
  selected,
  onChange,
  children,
}: {
  name: string;
  shortcut: string;
  selected: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="apptics-choice" data-selected={selected}>
      <input type="radio" name={name} checked={selected} onChange={onChange} />
      <span className="apptics-key">{shortcut}</span>
      <span>{children}</span>
      {selected ? <span className="apptics-check">✓</span> : null}
    </label>
  );
}
