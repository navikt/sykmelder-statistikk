export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function suspenseKey<T>(key: T): string {
    return JSON.stringify(key)
}
