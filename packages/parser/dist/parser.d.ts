declare const info: (str: string) => void;
declare const error: (str: string) => void;
declare const compileCode: (code: string) => string;
declare const transformFilename: (filename: string) => string;
declare const compileFile: (filePath: string, outputPath: string) => string;
declare const compileFilesWithGlob: (pattern: string, outputDir: string) => void;
declare const bundleFiles: (entry: string, outputDir: string) => Promise<void>;
declare const buildFromConfig: (configPath: string) => Promise<void>;
declare const startDevServer: (userConfig: any, port: number) => void;

export { buildFromConfig, bundleFiles, compileCode, compileFile, compileFilesWithGlob, error, info, startDevServer, transformFilename };
