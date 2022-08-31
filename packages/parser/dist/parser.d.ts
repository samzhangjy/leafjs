declare const compileCode: (code: string) => string;
declare const transformFilename: (filename: string) => string;
declare const compileFile: (filePath: string, outputPath: string) => string;
declare const compileFilesWithGlob: (pattern: string, outputDir: string) => void;
declare const bundleFiles: (entry: string) => Promise<void>;
declare const buildFromConfig: (configPath: string) => Promise<void>;

export { buildFromConfig, bundleFiles, compileCode, compileFile, compileFilesWithGlob, transformFilename };
