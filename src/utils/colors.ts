import { Color4 } from "@babylonjs/core/Maths/math.color";

/**
 * Reads a CSS variable and returns a BabylonJS Color4.
 * Supports #hex, #hexA, rgb()/rgba(), hsl()/hsla(), oklch()[/alpha].
 */
export function getColor4FromCSSVariable(varName: string): Color4 {
  const key = varName.startsWith("--") ? varName : `--${varName}`;
  const raw = getComputedStyle(document.documentElement)
                .getPropertyValue(key)
                .trim();

  if (!raw) {
    throw new Error(`CSS variable "${key}" is not defined or is empty.`);
  }
  return parseToColor4(raw);
}

function parseToColor4(input: string): Color4 {
  const s = input.toLowerCase();

  if (s.startsWith("#")) {
    return parseHex(s);
  } else if (s.startsWith("rgb")) {
    return parseRgb(s);
  } else if (s.startsWith("hsl")) {
    return parseHsl(s);
  } else if (s.startsWith("oklch")) {
    return parseOklch(s);
  }

  throw new Error(`Unsupported color format "${input}".`);
}

export function parseHex(hex: string): Color4 {
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) {
    h = h.split("").map(c => c + c).join("");
  }
  if (h.length !== 6 && h.length !== 8) {
    throw new Error(`Invalid hex color "${hex}".`);
  }

  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;

  return new Color4(r, g, b, a);
}

function parseRgb(rgb: string): Color4 {
  const m = rgb.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/
  );
  if (!m) {
    throw new Error(`Invalid rgb(a) color "${rgb}".`);
  }
  const [, rs, gs, bs, as] = m;
  const r = Math.min(255, parseFloat(rs)) / 255;
  const g = Math.min(255, parseFloat(gs)) / 255;
  const b = Math.min(255, parseFloat(bs)) / 255;
  const a = as !== undefined ? parseFloat(as) : 1;

  return new Color4(r, g, b, a);
}

function parseHsl(hsl: string): Color4 {
  const m = hsl.match(
    /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)/
  );
  if (!m) {
    throw new Error(`Invalid hsl(a) color "${hsl}".`);
  }
  const [, hs, ss, ls, as] = m;
  const h = ((parseFloat(hs) % 360) + 360) % 360 / 360;
  const s = Math.min(100, parseFloat(ss)) / 100;
  const l = Math.min(100, parseFloat(ls)) / 100;
  const a = as !== undefined ? parseFloat(as) : 1;

  const [r, g, b] = hslToRgb(h, s, l);
  return new Color4(r, g, b, a);
}

/** Convert normalized HSL (all in 0–1) to RGB (0–1) */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l, l, l];

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const toRgb = (t: number) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  return [
    toRgb(h + 1 / 3),
    toRgb(h),
    toRgb(h - 1 / 3),
  ];
}

function parseOklch(input: string): Color4 {
  const m = input.match(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+(?:deg|rad|grad|turn)?)\s*(?:\/\s*([\d.]+)\s*)?\)/i
  );
  if (!m) {
    throw new Error(`Invalid oklch color "${input}".`);
  }
  const [, lS, cS, hS, aS] = m;
  const L = lS.endsWith("%") ? parseFloat(lS) / 100 : parseFloat(lS);
  const C = parseFloat(cS);
  const deg = parseAngle(hS);
  const hRad = (deg * Math.PI) / 180;
  const alpha = aS !== undefined ? parseFloat(aS) : 1;

  const [rLin, gLin, bLin] = oklchToLinearSrgb(L, C, hRad);
  const r = clamp(linearToSrgb(rLin), 0, 1);
  const g = clamp(linearToSrgb(gLin), 0, 1);
  const b = clamp(linearToSrgb(bLin), 0, 1);

  return new Color4(r, g, b, alpha);
}

function parseAngle(angle: string): number {
  const m = angle.match(/([\d.]+)(deg|rad|grad|turn)?/i);
  if (!m) {
    throw new Error(`Invalid angle "${angle}".`);
  }
  const [, numS, unit] = m;
  const val = parseFloat(numS);
  switch (unit?.toLowerCase()) {
    case "rad":
      return (val * 180) / Math.PI;
    case "grad":
      return val * 0.9;
    case "turn":
      return val * 360;
    default:
      return val;
  }
}

function oklchToLinearSrgb(L: number, C: number, h: number): [number, number, number] {
  const a_ = C * Math.cos(h);
  const b_ = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_;
  const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_;
  const s_ = L - 0.0894841775 * a_ - 1.2914855480 * b_;

  const r =  4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  const g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  const b = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_;

  return [r, g, b];
}

function linearToSrgb(v: number): number {
  return v <= 0.0031308
    ? 12.92 * v
    : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}