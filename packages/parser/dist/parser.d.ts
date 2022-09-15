declare const info: (str: string) => void;
declare const error: (str: string) => void;
declare const bundleFiles: (entry: string, outputDir: string, typescriptDetails?: string) => Promise<string>;
declare const getConfigWithDefault: (userConfig: Record<string, string | null>) => {
    entry: string;
    outputDir: string;
    entryHTML: string;
    typescript: string | undefined;
};
declare const buildFromConfig: (configPath: string) => Promise<void>;
declare const DEV_SERVER_ROOT = "./.leaf";
declare const startDevServer: (userConfig: any, port: number) => void;

export { DEV_SERVER_ROOT, buildFromConfig, bundleFiles, error, getConfigWithDefault, info, startDevServer };
