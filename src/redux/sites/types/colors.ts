export class ColourUtils {
  /**
   * Given a string representing a hexCode colour, convert it into
   * an array of RGB values ranging from 0-255.
   */
  public static convertHexToRGB(hexColour: string): number[] {
    // Remove "#" prefix
    let hex: string = hexColour;
    if (hexColour.startsWith('#')) {
      hex = hexColour.substring(1);
    }

    let hexRed: string = '0';
    let hexGreen: string = '0';
    let hexBlue: string = '0';

    // Handle short notation
    if (hex.length === 3) {
      hexRed = hex.substr(0, 1);
      hexGreen = hex.substr(1, 1);
      hexBlue = hex.substr(2, 1);
    }

    // Handle long notation
    if (hex.length === 6) {
      hexRed = hex.substr(0, 2);
      hexGreen = hex.substr(2, 2);
      hexBlue = hex.substr(4, 2);
    }

    // Convert hex to decimal
    let r: number = parseInt(hexRed, 16);
    let g: number = parseInt(hexGreen, 16);
    let b: number = parseInt(hexBlue, 16);

    return [r, g, b];
  }

  /**
   * Given a colour palette (an array of colours as ColourPaletteItem), go through
   * and attempt to find a matching colour as specified by the `hexcode` parameter.
   */
  public static findColourByHexCode(
    colourPalette: ColourPaletteItem[],
    hexCode: string,
  ): ColourPaletteItem | undefined {
    hexCode = hexCode.toLowerCase().trim();
    return colourPalette.find((colour: ColourPaletteItem) => {
      return hexCode === colour.hexCode.toLowerCase().trim();
    });
  }

  public static convertHexToRGBA(hexColour: string, opacity: number): string {
    let [r, g, b] = this.convertHexToRGB(hexColour);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
  }
}

export interface ColourPaletteItem {
  hexCode: string;
  label: string;
  useLightForeground?: boolean;
}

export interface Style {
  color: string;
}
