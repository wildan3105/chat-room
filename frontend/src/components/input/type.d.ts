import { TypeInputEnum, ValueTypeInputEnum } from '.';

export type TypeInputType = typeof TypeInputEnum[keyof typeof TypeInputEnum];
export type ValueTypeInputType = typeof ValueTypeInputEnum[keyof typeof ValueTypeInputEnum];
