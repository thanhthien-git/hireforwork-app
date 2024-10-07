import { IBaseFilter } from "./IBaseFilter";

export interface IUserFilter extends IBaseFilter {
    careerFirstName : string, 
    lastName: string,
    careerEmail: string, 
    careerPhone: string
}