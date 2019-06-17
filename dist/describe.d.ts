import { DescribeCallback } from "./types";
export declare function setIsThrowError(a: boolean): void;
export declare function describe(specName: string, callback: DescribeCallback, deep?: number, id?: number, parentId?: number): Promise<void>;
