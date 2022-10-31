/**
 * Copied from CAT's minestar-web-common repo
 * /src/utils/object-utils.ts
 */

export class ObjectUtils {
  public static isSet(obj: any, prop: string): boolean {
    // note: We're specifically testing for undefined and null to ensure zeros are passed through
    if (!obj || obj[prop] === undefined || obj[prop] === null) {
      return false;
    } else if (typeof obj[prop] === 'string') {
      return obj[prop].trim().length > 0;
    } else {
      return true;
    }
  }

  public static clearProperties(obj: any, props: string[]): any {
    if (!obj) {
      return;
    }
    for (let prop of props) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = '';
      }
    }
  }

  public static clearAllProperties(obj: any): void {
    if (!obj) {
      return;
    }
    Object.keys(obj).forEach(key => (obj[key] = null));
  }

  /**
   * Tests if a value is not empty/zero
   */
  public static isSetAndNotZero(target: any, property: string) {
    let value = ObjectUtils.resolveProperty(target, property);
    return (
      ObjectUtils.isSet(value.target, value.property) && value.result !== 0
    );
  }

  /**
   * Resolves a chained/compound property e.g. 'material.name' to it's final value
   *
   * @returns result:{target:any, property:any, result:any}  They are the final target,
   *   final property and final result.  The result might be null or undefined.
   */
  public static resolveProperty(target: any, property: string): any {
    if (!target || !property || !property.includes('.')) {
      return {
        target,
        property,
        result: target ? target[property] : null,
      };
    }
    let finalTarget = target;
    let parts = property.split('.');
    let finalProperty = parts.pop();
    for (let part of parts) {
      finalTarget = finalTarget[part];
      if (!finalTarget) {
        break;
      }
    }
    return {
      target: finalTarget,
      property: finalProperty,
      result: finalTarget ? finalTarget[finalProperty!] : null,
    };
  }

  public static isValid(value: any): boolean {
    return value !== null && value !== undefined;
  }

  public static isNotValid(value: any): boolean {
    return value === null || value === undefined;
  }

  public static transFormPropertyToMap(object: any, propertyKey: string): void {
    const returnMap = new Map();
    const values = object[propertyKey];
    if (values) {
      for (const value in values) {
        if (values.hasOwnProperty(value)) {
          returnMap.set(value, values[value]);
        }
      }
    }
    object[propertyKey] = returnMap;
  }
}
