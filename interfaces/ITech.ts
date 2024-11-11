import { IBaseFilter } from "./IBaseFilter";

export interface ITech extends IBaseFilter {
  technology?: string;
  isDeleted?: boolean;
}
