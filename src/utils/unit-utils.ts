/**
 * Copied from CAT's minestar-web-common repo
 * /src/utils/unit-utils.ts
 */

import {units} from 'minestar-units';
import {ObjectUtils} from './object-utils';
import {UnitType} from '../constants/common';
import Unit = units.Unit;

export class UnitUtils {
  public static DEFAULT_LOCAL_UNIT_SYSTEM: string = units.MINING_SI.name;
  private static crsUnit: string = units.METRE.symbol;

  // Translation keys
  public static TRANSLATION_KEYS: string[] = [
    'unit_metre_symbol',
    'unit_foot_symbol',
    'unit_degrees_symbol',
    'unit_kilometres_per_hour_symbol',
    'unit_miles_per_hour_symbol',
    'unit_bank_cubic_metres',
    'unit_bank_cubic_metres_symbol',
    'unit_bank_cubic_metres_per_hour',
    'unit_bank_cubic_metres_per_hour_symbol',
    'unit_bank_cubic_yards',
    'unit_bank_cubic_yards_symbol',
    'unit_bank_cubic_yards_per_hour',
    'unit_bank_cubic_yards_per_hour_symbol',
    'unit_loads',
    'unit_loads_symbol',
    'unit_loads_per_hour',
    'unit_loads_per_hour_symbol',
    'unit_ton',
    'unit_ton_symbol',
    'unit_tons_per_hour',
    'unit_tons_per_hour_symbol',
    'unit_tonne',
    'unit_tonne_symbol',
    'unit_tonnes_per_hour',
    'unit_tonnes_per_hour_symbol',
    'unit_kiloton_symbol',
    'unit_kilotonne_symbol',
    'unit_percent',
    'unit_percent_symbol',
    'unit_second',
    'unit_second_symbol',
    'unit_minute',
    'unit_minute_symbol',
    'unit_hour',
    'unit_hour_symbol',
    'unit_litre',
    'unit_litre_symbol',
    'unit_dbm',
    'unit_dbm_symbol',
  ];

  /**
   * Converts a storage unit value to a local unit value.
   * @param storageValue              The storage unit value to be converted
   * @param storageUnitNameOrSymbol   The storage unit name or symbol for the value
   * @returns                         The local unit value resulting from the conversion
   */
  public static toLocalUnitValue(
    storageValue: number,
    storageUnitNameOrSymbol: string,
  ): number {
    let storageUnit: units.Unit = units.Unit.of(storageUnitNameOrSymbol);
    let localUnit: units.Unit = units.MINING_SI.preferredUnit(
      storageUnit.quantityType,
    );
    if (units.getLocalUnitSystem() === units.MINING_IMPERIAL.name) {
      localUnit = units.MINING_IMPERIAL.preferredUnit(storageUnit.quantityType);
    }
    let storageQuantity: units.Quantity = new units.Quantity(
      storageValue,
      storageUnit,
    );
    let localQuantity: units.Quantity = storageQuantity.toUnit(localUnit);
    return localQuantity.value;
  }

  /**
   * Converts a local unit value to a storage unit value.
   * @param localValue            The local unit value to be converted
   * @param localUnitNameOrSymbol The local unit name or symbol for the value
   * @returns                     The storage unit value resulting from the conversion
   */
  public static toStorageUnitValue(
    localValue: number,
    localUnitNameOrSymbol: string,
  ): number {
    let localUnit: units.Unit = units.Unit.of(localUnitNameOrSymbol);
    let storagePreferredUnit: units.Unit = units.MINING_SI.preferredUnit(
      localUnit.quantityType,
    );
    let localQuantity: units.Quantity = new units.Quantity(
      localValue,
      localUnit,
    );
    let storagePreferredQuantity: units.Quantity =
      localQuantity.toUnit(storagePreferredUnit);
    return storagePreferredUnit.toBaseUnit(storagePreferredQuantity.value);
  }

  /**
   * Converts a local unit name or symbol to a storage unit name.
   * @param localUnitNameOrSymbol The local unit name or symbol to be converted
   * @returns The storage unit name resulting from the conversion
   */
  public static toStorageUnitName(localUnitNameOrSymbol: string): string {
    let localUnit: units.Unit = units.Unit.of(localUnitNameOrSymbol);
    let storageSystemUnit: units.Unit = units.MINING_SI.systemUnit(
      localUnit.quantityType,
    );
    return storageSystemUnit.name;
  }

  /**
   * Converts a base unit value to a local unit value.  This will be the named unit, instead of the preferred unit for the
   * unit type.
   * @param baseUnitValue            The value, in the quantity's base unit, to be converted
   * @param targetUnitNameOrSymbol   The unit name or symbol for the value to be displayed in
   * @returns                         The unit value resulting from the conversion
   */
  public static toNamedUnitValue(
    baseUnitValue: number,
    targetUnitNameOrSymbol: string,
  ): number {
    let namedUnit: units.Unit = units.Unit.of(targetUnitNameOrSymbol);
    return namedUnit.fromBaseUnit(baseUnitValue);
  }

  /**
   * Converts a unit name or symbol to a localisation key. If a scale is provided, the localisation key for that scale will be returned,
   * otherwise the localisation key for the preferred units will be returned.
   * @param unitNameOrSymbol  The unit name or symbol to be converted
   * @param toSymbol          Whether to convert the unit name or symbol to the localisation key for the unit symbol
   * @param scale             The scale of the unit (optional)
   * @returns                 The localisation key resulting from the conversion
   */
  public static toLocalisationKey(
    unitNameOrSymbol: string,
    toSymbol?: boolean,
    scale?: string,
  ): string {
    if (unitNameOrSymbol === '' || unitNameOrSymbol === undefined) {
      return '';
    }
    let quantityType: units.QuantityType =
      units.Unit.of(unitNameOrSymbol).quantityType;
    let localUnit: units.Unit = units.MINING_SI.preferredUnit(quantityType);
    if (units.getLocalUnitSystem() === units.MINING_IMPERIAL.name) {
      localUnit = units.MINING_IMPERIAL.preferredUnit(quantityType);
    }
    let key: string = 'unit_';
    if (scale) {
      key += scale;
    }
    key += localUnit.name.replace(/\s+/g, '_');
    if (toSymbol) {
      key += '_symbol';
    }
    return key;
  }

  /**
   * Converts a unit name or symbol to a localisation key.
   * @param unitNameOrSymbol  The unit name or symbol to be converted
   * @param toSymbol          Whether to convert the unit name or symbol to the localisation key for the unit symbol
   * @returns                 The localisation key resulting from the conversion
   */
  public static toNamedLocalisationKey(
    unitNameOrSymbol: string,
    toSymbol?: boolean,
  ): string {
    if (unitNameOrSymbol === '' || unitNameOrSymbol === undefined) {
      return '';
    }
    let namedUnit: units.Unit = units.Unit.of(unitNameOrSymbol);
    let key: string = 'unit_';
    key += namedUnit.name.replace(/\s+/g, '_');
    if (toSymbol) {
      key += '_symbol';
    }
    return key;
  }

  /**
   * Determines whether the a unit name or symbol is a mass unit.
   * @param unitNameOrSymbol  The unit name or symbol
   * @returns                 True if the unit name or symbol is a mass unit, otherwise false
   */
  public static isMass(unitNameOrSymbol: string): boolean {
    let quantityType: units.QuantityType =
      units.Unit.of(unitNameOrSymbol).quantityType;
    return quantityType === units.QuantityType.MASS;
  }

  /**
   * Determines whether the a unit name or symbol is a rate unit.
   * @param unitNameOrSymbol  The unit name or symbol
   * @returns                 True if the unit name or symbol is a rate unit, otherwise false
   */
  public static isRate(unitNameOrSymbol: string): boolean {
    let quantityType: units.QuantityType =
      units.Unit.of(unitNameOrSymbol).quantityType;
    switch (quantityType) {
      case units.QuantityType.MASS_FLOW_RATE:
      case units.QuantityType.LOAD_RATE:
      case units.QuantityType.BANK_VOLUME_FLOW_RATE:
        return true;
    }
    return false;
  }

  /**
   * Converts a storage unit name or symbol to the preferred local unit symbol.
   * @param storageUnitNameOrSymbol   The storage unit name or symbol to be converted
   * @returns                         The preferred local unit symbol resulting from the conversion
   */
  public static toPreferredLocalUnitSymbol(
    storageUnitNameOrSymbol: string,
  ): string {
    let quantityType: units.QuantityType = units.Unit.of(
      storageUnitNameOrSymbol,
    ).quantityType;
    let localUnit: units.Unit = units.MINING_SI.preferredUnit(quantityType);
    if (units.getLocalUnitSystem() === units.MINING_IMPERIAL.name) {
      localUnit = units.MINING_IMPERIAL.preferredUnit(quantityType);
    }
    return localUnit.symbol;
  }

  /**
   * Converts a storage unit name or symbol to the preferred local unit name.
   * @param storageUnitNameOrSymbol   The storage unit name or symbol to be converted
   * @returns                         The preferred local unit name resulting from the conversion
   */
  public static toPreferredLocalUnitName(
    storageUnitNameOrSymbol: string,
  ): string {
    let quantityType: units.QuantityType = units.Unit.of(
      storageUnitNameOrSymbol,
    ).quantityType;
    let localUnit: units.Unit = units.MINING_SI.preferredUnit(quantityType);
    if (units.getLocalUnitSystem() === units.MINING_IMPERIAL.name) {
      localUnit = units.MINING_IMPERIAL.preferredUnit(quantityType);
    }
    return localUnit.name;
  }

  /**
   * Retrieves the preferred local unit for a given quantity type
   * @param quantityType quantity type of unit desired
   * @returns The preferred local unit of the quantity
   */
  public static toPreferredLocalUnit(quantityType: units.QuantityType): Unit {
    let localUnit: units.Unit = units.MINING_SI.preferredUnit(quantityType);
    if (units.getLocalUnitSystem() === units.MINING_IMPERIAL.name) {
      localUnit = units.MINING_IMPERIAL.preferredUnit(quantityType);
    }
    return localUnit;
  }

  /**
   * Retrieves the system unit for a given quantity type
   * @param quantityType quantity type of unit desired
   * @returns The system unit of the quantity
   */
  public static toSystemUnit(quantityType: units.QuantityType): Unit {
    let localUnit: units.Unit = units.MINING_SI.systemUnit(quantityType);
    if (units.getLocalUnitSystem() === units.MINING_IMPERIAL.name) {
      localUnit = units.MINING_IMPERIAL.systemUnit(quantityType);
    }
    return localUnit;
  }

  /**
   * Converts a unit type to a quantity type.
   * @param unitType is the unit type to be converted.
   * @returns the equivalent quantity type for the specified unit type.
   */
  public static toQuantityType(unitType: UnitType): units.QuantityType | null {
    switch (unitType) {
      case UnitType.LOAD:
        return units.QuantityType.LOAD;
      case UnitType.MASS:
        return units.QuantityType.MASS;
      case UnitType.VOLUME:
        return units.QuantityType.BANK_VOLUME;
    }
    return null;
  }

  /**
   * Converts a unit type to a quantity type.
   * @param unitType is the unit type to be converted.
   * @returns the equivalent quantity type for the specified unit type.
   */
  public static toUnitType(quantityType: units.QuantityType): UnitType | null {
    switch (quantityType) {
      case units.QuantityType.LOAD:
      case units.QuantityType.LOAD_RATE:
        return UnitType.LOAD;
      case units.QuantityType.MASS:
      case units.QuantityType.MASS_FLOW_RATE:
        return UnitType.MASS;
      case units.QuantityType.BANK_VOLUME:
      case units.QuantityType.BANK_VOLUME_FLOW_RATE:
        return UnitType.VOLUME;
    }
    return null;
  }

  /**
   * Converts a unit name or symbol to a base unit.
   * @param unitNameOrSymbol the unit name or symbol to be converted.
   * @returns the base unit for the specified unit name or symbol.
   */
  public static toBaseUnit(unitNameOrSymbol: string): units.Unit | null {
    let quantityType: units.QuantityType =
      units.Unit.of(unitNameOrSymbol).quantityType;
    switch (quantityType) {
      case units.QuantityType.LOAD:
      case units.QuantityType.LOAD_RATE:
        return units.LOADS;
      case units.QuantityType.MASS:
      case units.QuantityType.MASS_FLOW_RATE:
        return units.KILOGRAM;
      case units.QuantityType.BANK_VOLUME:
      case units.QuantityType.BANK_VOLUME_FLOW_RATE:
        return units.BANK_CUBIC_METRES;
    }
    return null;
  }

  /**
   * Sets the local unit system.
   * @param name  The name of the unit system to use.
   */
  public static setLocalUnitSystem(name: string) {
    units.setLocalUnitSystem(name);
  }

  /**
   * Converts a value with an optional unit to the correct display unit or -- if anything is null or zero
   * The properties may be compound properties e.g. 'material.name'
   * e.g. 1kg/s -> 3.6tonne/hr or '--' if not set
   */
  public static toDisplayValue(
    target: any,
    valueProperty: string,
    unitProperty?: string,
  ): any {
    let value = ObjectUtils.resolveProperty(target, valueProperty);
    if (unitProperty) {
      let unit = ObjectUtils.resolveProperty(target, unitProperty);
      if (
        ObjectUtils.isSetAndNotZero(value.target, value.property) &&
        ObjectUtils.isSetAndNotZero(unit.target, unit.property) &&
        !isNaN(Number(value.result))
      ) {
        return UnitUtils.toLocalUnitValue(value.result, unit.result);
      }
      return 0;
    } else if (ObjectUtils.isSet(value.target, value.property)) {
      return value.result;
    }
    return '--';
  }

  /**
   * Converts a storage unit to the correct display unit. e.g. kg/s -> ton/hr
   * The unitProperty may be compound properties e.g. 'material.unit'
   */
  public static toDisplayUnit(
    target: any,
    unitProperty: string,
    showAbbr: boolean = true,
  ): string {
    let unit = ObjectUtils.resolveProperty(target, unitProperty);
    if (ObjectUtils.isSetAndNotZero(unit.target, unit.property)) {
      return UnitUtils.toLocalisationKey(unit.result, showAbbr);
    }
    return '';
  }

  public static setCrsUnit(crsUnit: string) {
    this.crsUnit = crsUnit;
  }

  public static getCrsUnit(): string {
    let crsUnit = this.crsUnit;
    return crsUnit;
  }
}
