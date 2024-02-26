export interface IPropertyBase {
    id: number;
    sellRent: number;
    projectName: string;
    name: string;
    propertyType: string;
    building_flat: boolean;
    villa: boolean;
    furnishingType: string;
    bathroom: number;
    price: number;
    bhk: number;
    builtArea: number;
    city: string;
    readyToMove: boolean;
    image?: string;
    estPossessionOn?: string;

    // contactCommission: number;
    // contactCompany: string;
    // contactName: string;
    // contactNumber: string;
    // contactNumber2: string;
    // contactEmail: string;
}
