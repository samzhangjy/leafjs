export declare const compileCode: (code: string) => string;
export declare const transformFilename: (filename: string) => string;
export declare const compileFile: (filePath: string, outputPath: string) => string;
export declare const compileFilesWithGlob: (pattern: string, outputDir: string) => void;
export declare const bundleFiles: (entry: string, outputDir: string) => Promise<void>;
export declare const buildFromConfig: (configPath: string) => Promise<void>;
//# sourceMappingURL=index.d.ts.map