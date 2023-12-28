import { createAction } from "@reduxjs/toolkit";
import { Farms } from "./farmReducer";

export const updateFarms = createAction<Farms>("farms/updateFarms");
export const clearFarms = createAction("farms/clearFarms");