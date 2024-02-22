export interface IPropertyBase {
    id: number;
    sellRent: number;
    projectName: string;
    name: string;
    propertyType: string;
    furnishingType: string;
    price: number;
    bhk: number;
    builtArea: number;
    city: string;
    readyToMove: number;
    image?: string;
}
