import { IBaseFilter } from "./IBaseFilter";

export interface ICategory extends IBaseFilter {
  _id?: string;
  categoryName?: string;
  isDeleted?: boolean;
}
