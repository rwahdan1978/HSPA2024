import { IPropertyBase } from "./ipropertybase";


export class Property implements IPropertyBase {
    id: number;
    sellRent: number;
    projectName: string;
    name: string;
    propertyType: string;
    building_flat: boolean;
    villa: boolean;
    bhk: number;
    bathroom: number;
    country: string;
    furnishingType: string;
    price: number;
    builtArea: number;
    CarpetArea?: number;
    address: string;
    address2?: string;
    city: string;
    floorNo?: string;
    totalFloor?: string;
    readyToMove: boolean;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    estPossessionOn?: Date;
    image?: string;
    description?: string;
}
