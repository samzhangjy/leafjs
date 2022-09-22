import { ModuleFormat } from 'rollup';
export declare const info: (str: string) => void;
export declare const error: (str: string) => void;
export declare const warn: (str: string) => void;
export declare type LeafConfig = {
    entry: string;
    outputDir: string;
    entryHTML: string;
    typescript?: string;
    formats: {
        format: ModuleFormat;
        external: string[];
        path: string;
    }[];
};
export declare const bundleFiles: (config: LeafConfig) => Promise<string | null>;
export declare const getConfigWithDefault: (userConfig: Record<string, any>) => LeafConfig;
export declare const buildFromConfig: (configPath: string) => Promise<void>;
export declare const DEV_SERVER_ROOT = "./.leaf";
export declare const startDevServer: (userConfig: any, port: number) => void;
//# sourceMappingURL=index.d.ts.map