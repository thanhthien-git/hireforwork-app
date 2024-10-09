import { IBaseFilter } from "./IBaseFilter";

export interface ICompanyFilter extends IBaseFilter{
    companyName: string,
    companyEmail: string
}