export declare module units {
  /**
   * Types of Quantity.
   */
  enum QuantityType {
    ABSORBED_DOSE = 1,
    ACCELERATION = 2,
    ACIDITY = 3,
    AMOUNT_OF_SUBSTANCE = 4,
    ANGLE = 5,
    ANGULAR_ACCELERATION = 6,
    ANGULAR_SPEED = 7,
    APPARENT_POWER = 8,
    AREA = 9,
    BANK_VOLUME = 10,
    BANK_VOLUME_FLOW_RATE = 11,
    COUNT_PER_TIME = 12,
    CURVATURE = 13,
    DENSITY = 14,
    ELECTRIC_CAPACITANCE = 15,
    ELECTRIC_CHARGE = 16,
    ELECTRIC_CONDUCTANCE = 17,
    ELECTRIC_CURRENT = 18,
    ELECTRIC_INDUCTANCE = 19,
    ELECTRIC_POTENTIAL = 20,
    ELECTRIC_RESISTANCE = 21,
    ENERGY = 22,
    ENERGY_PER_FUEL_BURN = 23,
    FORCE = 24,
    FREQUENCY = 25,
    FUEL_BURN_PER_DISTANCE = 26,
    ILLUMINANCE = 27,
    INDEX = 28,
    LATITUDE = 29,
    LENGTH = 30,
    LIQUID_VOLUME = 31,
    LIQUID_VOLUME_PER_AREA = 32,
    LOAD = 33,
    LOAD_RATE = 34,
    LONGITUDE = 35,
    LOOSE_VOLUME = 36,
    LOOSE_VOLUME_FLOW_RATE = 37,
    LUMINOUS_FLUX = 38,
    LUMINOUS_INTENSITY = 39,
    MAGNETIC_FLUX = 40,
    MAGNETIC_FLUX_DENSITY = 41,
    MASS = 42,
    MASS_DISTANCE = 43,
    MASS_FLOW_RATE = 44,
    MASS_SPEED = 45,
    PARTS_PER_PARTS = 46,
    POWER = 47,
    PRESSURE = 48,
    QUANTITY = 49,
    RADIOACTIVITY = 50,
    RATIO = 51,
    REACTIVE_POWER = 52,
    SCREEN_RESOLUTION = 53,
    SCREEN_WIDTH = 54,
    SIGNAL_STRENGTH = 55,
    SOLID_ANGLE = 56,
    SPEED = 57,
    STORAGE = 58,
    TEMPERATURE = 59,
    TIME = 60,
    TORQUE = 61,
    UNITLESS = 62,
    VISCOSITY = 63,
    VOLUME = 64,
    VOLUMETRIC_FLOW_RATE = 65,
  }
  /**
   * Unit of measurement.
   */
  class Unit {
    private _symbol;
    private _name;
    private _quantityType;
    /**
     * Return the {@link Unit} with the given {@code symbolOrName}
     *
     * @param symbolOrName A unit symbol or name
     * @return the {@link Unit} with the given {@code symbolOrName}
     * @throws Error when symbol/name is not found
     */
    static of(symbolOrName: string): Unit;
    constructor(_symbol: string, _name: string, _quantityType: QuantityType);
    readonly symbol: string;
    readonly name: string;
    readonly quantityType: QuantityType;
    toString(): string;
    /**
     * Return the system {@link Unit} representing the set of units of the same quantity type
     *
     * @return the system {@link Unit} representing the set of units of the same quantity type
     */
    systemUnit(): Unit;
    /**
     * Return the 'preferred' {@link Unit} representing the set of units of the same quantity type
     *
     * @return the 'preferred' {@link Unit} representing the set of units of the same quantity type
     */
    preferredUnit(): Unit;
    /**
     * Convert the {@code value} from this unit to the base (SI) unit of this {@code quantityType}.
     *
     * @param value A number
     * @return the {@code value}, converted from this unit to the base (SI) unit of this {@code quantityType}
     */
    toBaseUnit(value: number): number;
    /**
     * Convert the {@code value} from the base (SI) unit of this {@code quantityType} to this unit.
     *
     * @param value A number
     * @return the {@code value}, converted from the base (SI) unit of this {@code quantityType} to this unit.
     */
    fromBaseUnit(value: number): number;
  }
  const GRAY: Unit;
  const METRES_PER_SECOND_SQUARED: Unit;
  const FEET_PER_SECOND_SQUARED: Unit;
  const GRAVITY: Unit;
  const MG_KOH_PER_G: Unit;
  const MOLE: Unit;
  const RADIAN: Unit;
  const DEGREES: Unit;
  const GRADIANS: Unit;
  const REVOLUTIONS: Unit;
  const RPM_PER_SECOND: Unit;
  const RADIANS_PER_SECOND: Unit;
  const DEGREES_PER_SECOND: Unit;
  const REVOLUTIONS_PER_MINUTE: Unit;
  const VOLT_AMPERE: Unit;
  const KILOVOLT_AMPERE: Unit;
  const SQUARE_METRES: Unit;
  const SQUARE_FEET: Unit;
  const SQUARE_YARDS: Unit;
  const SQUARE_INCHES: Unit;
  const HECTARE: Unit;
  const ACRE: Unit;
  const SQUARE_MILES: Unit;
  const BANK_CUBIC_METRES: Unit;
  const BANK_CUBIC_YARDS: Unit;
  const BANK_CUBIC_METRES_PER_SECOND: Unit;
  const BANK_CUBIC_METRES_PER_HOUR: Unit;
  const BANK_CUBIC_METRES_PER_MINUTE: Unit;
  const BANK_CUBIC_YARDS_PER_MINUTE: Unit;
  const BANK_CUBIC_YARDS_PER_HOUR: Unit;
  const COUNT_PER_SECOND: Unit;
  const COUNT_PER_MINUTE: Unit;
  const COUNT_PER_HOUR: Unit;
  const BAUD: Unit;
  const RADIANS_PER_METRE: Unit;
  const DEGREES_PER_METRE: Unit;
  const RADIANS_PER_FOOT: Unit;
  const KILOGRAMS_PER_CUBIC_METRE: Unit;
  const TONNES_PER_CUBIC_METRE: Unit;
  const GRAMMES_PER_CUBIC_CENTIMETRE: Unit;
  const POUNDS_PER_CUBIC_FOOT: Unit;
  const TONS_PER_CUBIC_YARD: Unit;
  const CUBIC_FEET_PER_TON: Unit;
  const FARAD: Unit;
  const COULOMB: Unit;
  const SIEMENS: Unit;
  const AMPERE: Unit;
  const MILLIAMPERE: Unit;
  const HENRY: Unit;
  const VOLT: Unit;
  const MILLIVOLT: Unit;
  const OHM: Unit;
  const JOULE: Unit;
  const FOOT_POUND: Unit;
  const BRITISH_THERMAL_UNIT: Unit;
  const CALORIE: Unit;
  const KILOWATT_HOUR: Unit;
  const HORSEPOWER_HOUR: Unit;
  const KILOJOULE: Unit;
  const MEGAJOULE: Unit;
  const KILOWATT_HOUR_PER_LITRE: Unit;
  const HORSEPOWER_HOUR_PER_GALLON: Unit;
  const NEWTON: Unit;
  const KILONEWTON: Unit;
  const POUND_FORCE: Unit;
  const HERTZ: Unit;
  const KILOHERTZ: Unit;
  const CUBIC_METRES_PER_METRE: Unit;
  const LITRES_PER_KILOMETRE: Unit;
  const GALLONS_PER_KILOMETRE: Unit;
  const GALLONS_PER_MILE: Unit;
  const LUX: Unit;
  const INDEX: Unit;
  const POSITION_INDEX: Unit;
  const GEAR: Unit;
  const DEGREES_OF_LATITUDE: Unit;
  const METRE: Unit;
  const FOOT: Unit;
  const SURFOOT: Unit;
  const INCH: Unit;
  const MILE: Unit;
  const YARD: Unit;
  const KILOMETRE: Unit;
  const MILLIMETRE: Unit;
  const CENTIMETRE: Unit;
  const CUBIT: Unit;
  const SMOOT: Unit;
  const LITRE: Unit;
  const GALLON: Unit;
  const QUART: Unit;
  const PINT: Unit;
  const LITRES_PER_SQUARE_METRE: Unit;
  const GALLONS_PER_SQUARE_FOOT: Unit;
  const LOADS: Unit;
  const LOADS_PER_SECOND: Unit;
  const LOADS_PER_MINUTE: Unit;
  const LOADS_PER_HOUR: Unit;
  const DEGREES_OF_LONGITUDE: Unit;
  const LOOSE_CUBIC_METRES: Unit;
  const LOOSE_CUBIC_YARDS: Unit;
  const LOOSE_CUBIC_METRES_PER_SECOND: Unit;
  const LOOSE_CUBIC_METRES_PER_HOUR: Unit;
  const LOOSE_CUBIC_METRES_PER_MINUTE: Unit;
  const LOOSE_CUBIC_YARDS_PER_MINUTE: Unit;
  const LOOSE_CUBIC_YARDS_PER_HOUR: Unit;
  const LUMEN: Unit;
  const CANDELA: Unit;
  const WEBER: Unit;
  const TESLA: Unit;
  const KILOGRAM: Unit;
  const MILLIGRAM: Unit;
  const GRAM: Unit;
  const POUND: Unit;
  const CARAT: Unit;
  const OUNCE: Unit;
  const OUNCETROY: Unit;
  const TON: Unit;
  const TONNE: Unit;
  const KILOTONNE: Unit;
  const KILOTON: Unit;
  const KILOGRAM_METRE: Unit;
  const TONNE_KILOMETRE: Unit;
  const TON_MILE: Unit;
  const KILOGRAMS_PER_SECOND: Unit;
  const KILOGRAMS_PER_HOUR: Unit;
  const KILOGRAMS_PER_MINUTE: Unit;
  const TONS_PER_SECOND: Unit;
  const POUNDS_PER_MINUTE: Unit;
  const POUNDS_PER_HOUR: Unit;
  const TONS_PER_HOUR: Unit;
  const TONNES_PER_SECOND: Unit;
  const TONNES_PER_HOUR: Unit;
  const KILOGRAM_METRE_PER_SECOND: Unit;
  const TON_MILE_PER_HOUR: Unit;
  const TONNE_KILOMETRE_PER_HOUR: Unit;
  const PARTS_PER_MILLION: Unit;
  const PARTS_PER_BILLION: Unit;
  const WATT: Unit;
  const POUND_FOOT_PER_HOUR: Unit;
  const HORSEPOWER: Unit;
  const KILOWATT: Unit;
  const PASCAL: Unit;
  const KILOPASCAL: Unit;
  const MEGAPASCAL: Unit;
  const ATMOSPHERE: Unit;
  const BAR: Unit;
  const POUNDS_PER_SQUARE_INCH: Unit;
  const MM_OF_MERCURY: Unit;
  const INCH_OF_WATER: Unit;
  const INCH_OF_MERCURY: Unit;
  const COUNT: Unit;
  const TENS: Unit;
  const HUNDREDS: Unit;
  const THOUSANDS: Unit;
  const TEN_THOUSANDS: Unit;
  const HUNDRED_THOUSANDS: Unit;
  const MILLIONS: Unit;
  const BECQUEREL: Unit;
  const PERCENT: Unit;
  const GRAMS_PER_SHORT_TON: Unit;
  const KILOGRAMS_PER_TONNE: Unit;
  const OUNCES_PER_SHORT_TON: Unit;
  const OUNCESTROY_PER_SHORT_TON: Unit;
  const GRAMS_PER_TONNE: Unit;
  const RELATIVE: Unit;
  const VOLT_AMPERE_REACTIVE: Unit;
  const KILOVOLT_AMPERE_REACTIVE: Unit;
  const PIXELS_PER_METRE: Unit;
  const PIXEL: Unit;
  const DBM: Unit;
  const STERADIAN: Unit;
  const METRES_PER_SECOND: Unit;
  const FEET_PER_SECOND: Unit;
  const FEET_PER_MINUTE: Unit;
  const FEET_PER_HOUR: Unit;
  const MILLIMETRES_PER_SECOND: Unit;
  const INCHES_PER_SECOND: Unit;
  const KILOMETRES_PER_HOUR: Unit;
  const KILOMETRES_PER_SECOND: Unit;
  const METRES_PER_MINUTE: Unit;
  const METRES_PER_HOUR: Unit;
  const MILES_PER_HOUR: Unit;
  const KNOTS: Unit;
  const BYTE: Unit;
  const BIT: Unit;
  const KILOBYTE: Unit;
  const MEGABYTE: Unit;
  const GIGABYTE: Unit;
  const TERABYTE: Unit;
  const PETABYTE: Unit;
  const EXABYTE: Unit;
  const KELVIN: Unit;
  const CELSIUS: Unit;
  const FAHRENHEIT: Unit;
  const SECOND: Unit;
  const MILLISECOND: Unit;
  const MICROSECOND: Unit;
  const MINUTE: Unit;
  const HOUR: Unit;
  const DAY: Unit;
  const NEWTON_METRE: Unit;
  const KILONEWTON_METRE: Unit;
  const INCH_POUNDS: Unit;
  const FOOT_POUNDS: Unit;
  const ONE: Unit;
  const PASCAL_SECOND: Unit;
  const CUBIC_METRES: Unit;
  const KILO_CUBIC_METRES: Unit;
  const CUBIC_FEET: Unit;
  const CUBIC_YARDS: Unit;
  const CUBIC_INCH: Unit;
  const CUBIC_CENTIMETRES: Unit;
  const CUBIC_MILLIMETRES: Unit;
  const CUBIC_METRES_PER_SECOND: Unit;
  const CUBIC_METRES_PER_HOUR: Unit;
  const STANDARD_CUBIC_METRES_PER_HOUR: Unit;
  const LITRES_PER_SECOND: Unit;
  const LITRES_PER_MINUTE: Unit;
  const LITRES_PER_HOUR: Unit;
  const GALLONS_PER_SECOND: Unit;
  const GALLONS_PER_MINUTE: Unit;
  const GALLONS_PER_HOUR: Unit;
  const CUBIC_FEET_PER_MINUTE: Unit;
  const STANDARD_CUBIC_FEET_PER_MINUTE: Unit;
  const CUBIC_FEET_PER_SECOND: Unit;
  const CUBIC_INCHES_PER_SECOND: Unit;
  const CUBIC_CENTREMETRES_PER_SECOND: Unit;
  /**
   * Return the {@link Unit}s supported by the given {@code quantityType}.
   *
   * @param quantityType A type of Quantity.
   * @return the {@link Unit}s supported by the given {@code quantityType}.
   */
  function getUnitsOfQuantityType(quantityType: QuantityType): Unit[];
  /**
   * System of Units.
   *
   * Allows the specification of a "preferred" unit for displaying each QuantityType.
   */
  class UnitSystem {
    private _name;
    private _preferredUnits;
    /**
     * Return the {@link UnitSystem} with the given {@code name}.
     *
     * @param name Name of a unit system
     * @return the {@link UnitSystem} with the given {@code name}.
     * @throws Error when not found
     */
    static of(name: string): UnitSystem;
    constructor(
      _name: string,
      _preferredUnits: {
        [type: number]: Unit;
      },
    );
    readonly name: string;
    /**
     * Return a map of {@link QuantityType} -> 'preferred' {@link Unit}.
     *
     * @return a map of {@link QuantityType} -> 'preferred' {@link Unit}.
     */
    readonly preferredUnits: {
      [type: number]: Unit;
    };
    /**
     * Return the 'preferred' unit for displaying a quantity of the given {@code quantityType}.
     *
     * @param quantityType A type of quantity
     * @return the 'preferred' unit for displaying a quantity of the given {@code quantityType}, else {@code null} if none.
     */
    preferredUnit(quantityType: QuantityType): Unit;
    /**
     * Return the 'system' unit for a quantity of the given {@code quantityType}.
     *
     * @param quantityType A type of quantity
     * @return the 'system' unit for a quantity of the given {@code quantityType}, else {@code null} if none.
     */
    systemUnit(quantityType: QuantityType): Unit;
    toString(): string;
  }
  const MINING_SI: UnitSystem;
  const MINING_IMPERIAL: UnitSystem;
  /**
   * Set the "local" {@link UnitSystem}
   *
   * @param name Name of a {@link UnitSystem}.
   */
  function setLocalUnitSystem(name: string): void;
  /**
   * Return the name of the "local" {@link UnitSystem}.
   *
   * @return the name of the "local" {@link UnitSystem}
   */
  function getLocalUnitSystem(): string;
  /**
   * Return all available unit systems
   *
   * @return All available unit systems
   */
  function getUnitSystems(): UnitSystem[];
  /**
   * A quantity, which consists of a numeric {@code value} and a {@link #Unit}.
   */
  class Quantity {
    private _value;
    private _unit;
    /**
     * Return a {@link Quantity} with the given {@code value} and {@code unit}.
     *
     * @param value A numeric value
     * @param unit The unit object, symbol or name of a {@link Unit}.
     * @return a {@link Quantity} with the given {@code value} and {@code unit}.
     */
    static of(value: number, unit: any): Quantity;
    constructor(_value: number, _unit: Unit);
    readonly value: number;
    readonly intValue: number;
    readonly unit: Unit;
    /**
     * Convert this quantity to the given {@code unit}.
     *
     * @param unit A unit
     * @return this quantity converted to the given {@code unit}.
     */
    toUnit(unit: Unit): Quantity;
    /**
     * Convert the {@code qty} to the preferred "local" {@link Unit}.
     *
     * @return the {@code qty} converted to the preferred "local" {@link Unit}.
     */
    toLocalUnit(): Quantity;
    /**
     * Convert the {@code qty} to the system {@link Unit}.
     *
     * @return the {@code qty} converted to the system {@link Unit}.
     */
    toSystemUnit(): Quantity;
    /**
     * Returns a String containing the representation of this Quantity.
     * It will use the whole integer value of the Quantity and the symbol
     */
    toString(): string;
    /**
     * Returns a String containing the representation of this Quantity.
     * It will use the float value of the Quantity (using the number of provided
     * fixed decimal values) and the symbol
     */
    toPreciseString(fixedDecimals: number): string;
    toJSON(key: any): {
      value: number;
      unit: string;
    };
    static fromJSON(jsonStr: any): Quantity;
  }
}
