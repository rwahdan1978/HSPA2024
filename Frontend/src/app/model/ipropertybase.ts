export interface IPropertyBase {
    id: number;
    sellRent: number;
    projectName: string;
    name: string;
    propertyType: string;
    furnishingType: string;
    villa: boolean;
    bathroom: number;
    flatNumber: string;
    villaNumber: string;
    
    price: number;
    bhk: number;
    builtArea: number;
    city: string;
    readyToMove: boolean;
    photo?: string;
    estPossessionOn?: string;
}
