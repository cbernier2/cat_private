export class PlanArea {
  // Plan Area types
  public static readonly TYPE_FACE: string = 'face';
  public static readonly TYPE_DUMP: string = 'dump';
  public static readonly TYPE_CRUSHER: string = 'crusher';
  public static readonly TYPE_WORKSHOP: string = 'workshop';
  public static readonly TYPE_FUEL: string = 'fuel';
  public static readonly TYPE_PARKING: string = 'parking';
  public static readonly TYPE_OPERATOR_BREAK: string = 'operator_break';
  public static readonly TYPE_TYREBAY: string = 'tyrebay';
  public static readonly TYPE_WASHBAY: string = 'washbay';
  public static readonly TYPE_GOLINE: string = 'goline';
  public static readonly TYPE_WATER_REFILL: string = 'water_refill';

  // @ts-ignore
  public id: string;
  // @ts-ignore
  public name: string;
  // @ts-ignore
  public boundary: string;
  // @ts-ignore
  public startTime: number;
  // @ts-ignore
  public endTime: number;

  public isFace?: boolean;
  public isDump?: boolean;
  public isCrusher?: boolean;
  public isWorkshop?: boolean;
  public isFuel?: boolean;
  public isParking?: boolean;
  public isOperatorBreak?: boolean;
  public isTyreBay?: boolean;
  public isWashBay?: boolean;
  public isGoline?: boolean;
  public isWaterRefill?: boolean;
  public materialId?: string;
  public isFaceSuppressingUndefinedLoaderExceptions?: boolean;

  constructor(planArea?: PlanArea) {
    if (!planArea) {
      return;
    }

    this.id = planArea.id;
    this.name = planArea.name;
    this.boundary = planArea.boundary;
    this.isFace = planArea.isFace;
    this.isDump = planArea.isDump;
    this.isCrusher = planArea.isCrusher;
    this.isWorkshop = planArea.isWorkshop;
    this.isFuel = planArea.isFuel;
    this.isParking = planArea.isParking;
    this.isOperatorBreak = planArea.isOperatorBreak;
    this.isTyreBay = planArea.isTyreBay;
    this.isWashBay = planArea.isWashBay;
    this.isGoline = planArea.isGoline;
    this.isWaterRefill = planArea.isWaterRefill;
    this.materialId = planArea.materialId;
    this.startTime = planArea.startTime;
    this.endTime = planArea.endTime;
    this.isFaceSuppressingUndefinedLoaderExceptions =
      planArea.isFaceSuppressingUndefinedLoaderExceptions;
  }

  public static getAreaTypes(planArea: PlanArea): string[] {
    const types = [];
    if (planArea.isCrusher) {
      types.push(PlanArea.TYPE_CRUSHER);
    }
    if (planArea.isDump) {
      types.push(PlanArea.TYPE_DUMP);
    }
    if (planArea.isFace) {
      types.push(PlanArea.TYPE_FACE);
    }
    if (planArea.isFuel) {
      types.push(PlanArea.TYPE_FUEL);
    }
    if (planArea.isGoline) {
      types.push(PlanArea.TYPE_GOLINE);
    }
    if (planArea.isOperatorBreak) {
      types.push(PlanArea.TYPE_OPERATOR_BREAK);
    }
    if (planArea.isParking) {
      types.push(PlanArea.TYPE_PARKING);
    }
    if (planArea.isTyreBay) {
      types.push(PlanArea.TYPE_TYREBAY);
    }
    if (planArea.isWashBay) {
      types.push(PlanArea.TYPE_WASHBAY);
    }
    if (planArea.isWaterRefill) {
      types.push(PlanArea.TYPE_WATER_REFILL);
    }
    if (planArea.isWorkshop) {
      types.push(PlanArea.TYPE_WORKSHOP);
    }
    return types;
  }
}

// CommonConstants Category.categories also holds a similar reference based on the category type.
export class PlanAreaIconUtils {
  public static getIcon(planArea: PlanArea): string | null {
    if (planArea.isFace) {
      return 'load_area';
    } else if (planArea.isDump) {
      return 'dump_area';
    } else if (planArea.isCrusher) {
      return 'crusher';
    }
    return null;
  }
}
