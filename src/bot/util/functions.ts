export const wait: any = (ms: number) => new Promise(res => setTimeout(res, ms));

export function capitalize(init_str: string): string {
    return init_str.charAt(0).toUpperCase() + init_str.slice(1);
}