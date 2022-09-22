import { ModuleFormat } from 'rollup';

declare const info: (str: string) => void;
declare const error: (str: string) => void;
declare const warn: (str: string) => void;
declare type LeafConfig = {
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
declare const bundleFiles: (config: LeafConfig) => Promise<string | null>;
declare const getConfigWithDefault: (userConfig: Record<string, any>) => LeafConfig;
declare const buildFromConfig: (configPath: string) => Promise<void>;
declare const DEV_SERVER_ROOT = "./.leaf";
declare const startDevServer: (userConfig: any, port: number) => void;

export { DEV_SERVER_ROOT, LeafConfig, buildFromConfig, bundleFiles, error, getConfigWithDefault, info, startDevServer, warn };
