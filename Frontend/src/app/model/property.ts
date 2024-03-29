import { IPropertyBase } from "./ipropertybase";
import { Photo } from "./photo";


export class Property implements IPropertyBase {
    id: number;
    sellRent: number;
    projectName: string;
    name: string;
    propertyTypeId: number;
    propertyType: string;
    bhk: number;
    villa: boolean;
    bathroom: number;
    flatNumber: string;
    villaNumber: string;

    country: string;
    furnishingTypeId: number;
    furnishingType: string;
    price: number;
    builtArea: number;
    CarpetArea?: number;
    address: string;
    address2?: string;
    cityId: number;
    city: string;
    floorNo?: string;
    totalFloors?: string;
    readyToMove: boolean;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    estPossessionOn?: string;
    photo?: string;
    description?: string;
    postedBy: number;

    contactCommission: number;
    contactCompany: string;
    contactName: string;
    contactNumber: string;
    contactNumber2: string;
    contactEmail: string;
    photos?: Photo[];
}
