import {
  setFillingCmykColor,
  setFillingGrayscaleColor,
  setFillingRgbColor,
  setFillingRgbaColor,
  setStrokingCmykColor,
  setStrokingGrayscaleColor,
  setStrokingRgbColor,
  setStrokingRgbaColor,
} from 'src/api/operators';
import { assertRange, error } from 'src/utils';

export enum ColorTypes {
  Grayscale = 'Grayscale',
  RGB = 'RGB',
  CMYK = 'CMYK',
  RGBA = 'RGBA'
}

export interface Grayscale {
  type: ColorTypes.Grayscale;
  gray: number;
}

export interface RGB {
  type: ColorTypes.RGB;
  red: number;
  green: number;
  blue: number;
}

export interface RGBA {
  type: ColorTypes.RGBA;
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface CMYK {
  type: ColorTypes.CMYK;
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
}

export type Color = Grayscale | RGB | RGBA | CMYK;

export const grayscale = (gray: number): Grayscale => {
  assertRange(gray, 'gray', 0.0, 1.0);
  return { type: ColorTypes.Grayscale, gray };
};

export const rgb = (red: number, green: number, blue: number): RGB => {
  assertRange(red, 'red', 0, 1);
  assertRange(green, 'green', 0, 1);
  assertRange(blue, 'blue', 0, 1);
  return { type: ColorTypes.RGB, red, green, blue };
};

export const rgba = (red: number, green: number, blue: number, alpha: number): RGBA => {
  assertRange(red, 'red', 0, 1);
  assertRange(green, 'green', 0, 1);
  assertRange(blue, 'blue', 0, 1);
  assertRange(alpha, 'alpha', 0, 1);
  return { type: ColorTypes.RGBA, red, green, blue, alpha };
};

export const cmyk = (
  cyan: number,
  magenta: number,
  yellow: number,
  key: number,
): CMYK => {
  assertRange(cyan, 'cyan', 0, 1);
  assertRange(magenta, 'magenta', 0, 1);
  assertRange(yellow, 'yellow', 0, 1);
  assertRange(key, 'key', 0, 1);
  return { type: ColorTypes.CMYK, cyan, magenta, yellow, key };
};

const { Grayscale, RGB, RGBA, CMYK } = ColorTypes;

// prettier-ignore
export const setFillingColor = (color: Color) => 
    color.type === Grayscale ? setFillingGrayscaleColor(color.gray)
  : color.type === RGB       ? setFillingRgbColor(color.red, color.green, color.blue)
  : color.type === RGBA      ? setFillingRgbaColor(color.red, color.green, color.blue, color.alpha)
  : color.type === CMYK      ? setFillingCmykColor(color.cyan, color.magenta, color.yellow, color.key)
  : error(`Invalid color: ${JSON.stringify(color)}`);

// prettier-ignore
export const setStrokingColor = (color: Color) => 
    color.type === Grayscale ? setStrokingGrayscaleColor(color.gray)
  : color.type === RGB       ? setStrokingRgbColor(color.red, color.green, color.blue)
  : color.type === RGBA       ? setStrokingRgbaColor(color.red, color.green, color.blue, color.alpha)
  : color.type === CMYK      ? setStrokingCmykColor(color.cyan, color.magenta, color.yellow, color.key)
  : error(`Invalid color: ${JSON.stringify(color)}`);

// prettier-ignore
export const componentsToColor = (comps?: number[], scale = 1) => (
    comps?.length === 1 ? grayscale(
      comps[0] * scale,
    )
  : comps?.length === 3 ? rgb(
      comps[0] * scale, 
      comps[1] * scale, 
      comps[2] * scale,
    )
    : comps?.length === 3 ? rgba(
      comps[0] * scale, 
      comps[1] * scale, 
      comps[2] * scale,
      comps[3] * scale,
    )
  : comps?.length === 4 ? cmyk(
      comps[0] * scale, 
      comps[1] * scale, 
      comps[2] * scale, 
      comps[3] * scale,
    )
  : undefined
);

// prettier-ignore
export const colorToComponents = (color: Color) =>
    color.type === Grayscale ? [color.gray]
  : color.type === RGB       ? [color.red, color.green, color.blue]
  : color.type === RGBA       ? [color.red, color.green, color.blue, color.alpha]
  : color.type === CMYK      ? [color.cyan, color.magenta, color.yellow, color.key]
  : error(`Invalid color: ${JSON.stringify(color)}`);
