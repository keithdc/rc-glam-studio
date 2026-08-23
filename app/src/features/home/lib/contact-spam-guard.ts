/**
 * @file contact-spam-guard.ts — Client-side spam checks for the inquiry form
 * @feature home
 */

export const MIN_MESSAGE_LENGTH = 20;
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_NAME_LENGTH = 80;
export const MIN_OPEN_MS = 2000;
export const COOLDOWN_MS = 60_000;
export const MAX_SUBMITS_PER_DAY = 3;

const STORAGE_KEY = "rcmua_contact_submits";
const DAY_MS = 24 * 60 * 60 * 1000;

export type ContactSpamDecision =
  | { allow: true }
  | { allow: false; silent: true }
  | { allow: false; silent: false; message: string };

interface EvaluateContactSpamInput {
  honeypot: string;
  name: string;
  message: string;
  formOpenedAt: number;
  hasInteracted: boolean;
  now: number;
  submitTimestamps: number[];
}

/** Returns whether the inquiry should be sent, silently dropped, or blocked with a warning. */
export function evaluateContactSpam(
  input: EvaluateContactSpamInput,
): ContactSpamDecision {
  if (input.honeypot.trim() !== "") {
    return { allow: false, silent: true };
  }

  if (!input.hasInteracted || input.now - input.formOpenedAt < MIN_OPEN_MS) {
    return {
      allow: false,
      silent: false,
      message: "Please wait a moment and try sending again.",
    };
  }

  const name = input.name.trim();
  if (name.length < 2) {
    return {
      allow: false,
      silent: false,
      message: "Please enter your name so I know who to reply to.",
    };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return {
      allow: false,
      silent: false,
      message: "Please shorten your name so I can read it clearly.",
    };
  }

  const message = input.message.trim();
  if (message.length < MIN_MESSAGE_LENGTH) {
    return {
      allow: false,
      silent: false,
      message: `Please add a bit more detail (at least ${String(MIN_MESSAGE_LENGTH)} characters) so I can prepare for your booking.`,
    };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      allow: false,
      silent: false,
      message: "Please shorten your message a little so I can read it in one go.",
    };
  }

  const urlCount = (message.match(/https?:\/\//gi) ?? []).length;
  if (urlCount >= 3) {
    return { allow: false, silent: true };
  }

  const recent = input.submitTimestamps.filter((stamp) => input.now - stamp < DAY_MS);
  const lastSubmit = recent.at(-1);
  if (lastSubmit !== undefined && input.now - lastSubmit < COOLDOWN_MS) {
    const secondsLeft = Math.ceil((COOLDOWN_MS - (input.now - lastSubmit)) / 1000);
    return {
      allow: false,
      silent: false,
      message: `Please wait ${String(secondsLeft)} seconds before sending another message.`,
    };
  }

  if (recent.length >= MAX_SUBMITS_PER_DAY) {
    return {
      allow: false,
      silent: false,
      message:
        "You've reached today's inquiry limit. Email rhodacordova.mua@gmail.com if you need to add more details.",
    };
  }

  return { allow: true };
}

/** Reads recent inquiry timestamps from localStorage. */
export function readSubmitTimestamps(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((stamp): stamp is number => typeof stamp === "number");
  } catch {
    return [];
  }
}

/** Stores a successful send so cooldown and daily limits survive refresh. */
export function recordSubmit(now: number): void {
  const next = [
    ...readSubmitTimestamps().filter((stamp) => now - stamp < DAY_MS),
    now,
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
