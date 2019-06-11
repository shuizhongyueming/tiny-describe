export declare type DescribeCallback = (describe: Describe) => Promise<void> | void;
export declare type Describe = (specName: string, callback: DescribeCallback, deep?: number, id?: number, parentId?: number) => void;
export declare function describe(specName: string, callback: DescribeCallback, deep?: number, id?: number, parentId?: number): Promise<void>;
