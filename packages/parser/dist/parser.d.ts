declare const info: (str: string) => void;
declare const error: (str: string) => void;
declare const compileCode: (code: string) => string;
declare const transformFilename: (filename: string) => string;
declare const compileFile: (filePath: string, outputPath: string) => string;
declare const compileFilesWithGlob: (pattern: string, outputDir: string) => void;
declare const bundleFiles: (entry: string, outputDir: string) => Promise<string>;
declare const getConfigWithDefault: (userConfig: Record<string, string | null>) => {
    entry: string;
    outputDir: string;
    entryHTML: string;
};
declare const buildFromConfig: (configPath: string) => Promise<void>;
declare const DEV_SERVER_ROOT = "./.leaf";
declare const startDevServer: (userConfig: any, port: number) => void;

export { DEV_SERVER_ROOT, buildFromConfig, bundleFiles, compileCode, compileFile, compileFilesWithGlob, error, getConfigWithDefault, info, startDevServer, transformFilename };
