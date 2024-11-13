import { IBaseFilter } from "./IBaseFilter";

export interface ITech extends IBaseFilter {
  _id?: string;
  technology?: string;
  isDeleted?: boolean;
}
