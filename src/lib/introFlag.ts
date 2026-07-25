/** Shared between BrandSplash (writer) and the cookie consent banner (reader). */
export const INTRO_SEEN_KEY = "ww-intro-seen";
/** Dispatched on `window` the moment the splash intro has fully faded out. */
export const INTRO_DONE_EVENT = "ww-intro-done";
/**
 * Set on <html> by the pre-paint inline script in app/layout.tsx when the
 * intro hasn't been seen this session; paints an opaque curtain (see
 * globals.css) so the landing page never flashes before hydration mounts
 * BrandSplash, which removes it.
 */
export const INTRO_PENDING_ATTR = "data-ww-intro";
/**
 * Also set on <html> by the pre-paint script while the intro is pending, and
 * removed only once the splash has fully finished. Hero entrance animations
 * are held paused at their first frame for as long as it's present, so they
 * play when the visitor can see them instead of running behind the curtain.
 * Kept separate from INTRO_PENDING_ATTR, which is dropped earlier (as soon
 * as the splash takes over the screen).
 */
export const INTRO_HOLD_ATTR = "data-ww-hold";
