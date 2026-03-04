/**
 * Solar calculator & estimate constants.
 * Panels typically 440–460W; we use 450W for system size and generation estimates.
 */

/** Typical panel power in watts (440–460W range). */
export const PANEL_WATTS_W = 450;

/** Typical panel power in kW for kWp calculations. */
export const PANEL_KW = PANEL_WATTS_W / 1000;
