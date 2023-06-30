export function config({ cwd, development }: {
    cwd: string;
    development: boolean;
}): Promise<{
    assets: {
        base: {
            format: string;
            default: string;
        };
    };
}>;
