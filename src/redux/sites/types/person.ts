import {ColourPaletteItem, ColourUtils} from './colors';
import {PERSON_COLOUR_PALETTE} from './color_palettes';

export interface Person {
  id: string;
  name?: string;
  startTime?: number;
  endTime?: number;
  deleted?: boolean;
  firstName: string;
  lastName: string;
  preferredName?: string;
  userName?: string;
  isOperator: boolean;
  operatorLoginId?: number;
  crew?: string;
  preferredEquipmentId?: string;
  preferredEquipmentName?: string;
  companyName?: string;
  externalId?: string;
  color?: string;
  initials: string;
  lastUpdated?: number;
}

export namespace Person {
  export const DEFAULT_BACKGROUND_COLOR = '#999';
  export const DEFAULT_DARK_TEXT_COLOR = '#000';
  export const DEFAULT_LIGHT_TEXT_COLOR = '#FFF';

  export function getOperatorBackgroundColour(person: Person): string | null {
    if (person && !person.isOperator) {
      return null;
    }
    return getBackgroundColour(person);
  }

  export function getBackgroundColour(person: Person): string {
    if (person && person.color) {
      return person.color;
    }

    return Person.DEFAULT_BACKGROUND_COLOR;
  }

  export function getOperatorTextColour(person: Person): string | null {
    if (person && !person.isOperator) {
      return null;
    }

    return getTextColour(person);
  }

  export function getTextColour(person: Person): string {
    const backgroundColor = Person.getBackgroundColour(person);
    if (!backgroundColor) {
      return Person.DEFAULT_LIGHT_TEXT_COLOR;
    }

    const item: ColourPaletteItem | undefined = ColourUtils.findColourByHexCode(
      PERSON_COLOUR_PALETTE,
      backgroundColor,
    );
    if (item && !item.useLightForeground) {
      return Person.DEFAULT_DARK_TEXT_COLOR;
    }

    return Person.DEFAULT_LIGHT_TEXT_COLOR;
  }
}
