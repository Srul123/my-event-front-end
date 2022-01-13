export function toUpperCaseCleanName(str: string): string {
    let parsedString = str.replace(/\s+/g, ' ').trim();
    return parsedString.charAt(0).toUpperCase() + parsedString.slice(1);
}