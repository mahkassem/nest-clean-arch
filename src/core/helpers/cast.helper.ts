import Decimal from "decimal.js";

interface ToNumberOptions {
    default?: number;
    min?: number;
    max?: number;
}

export function toString(value: any): string {
    return value.toString() || '';
}

export function toLowerCase(value: string): string {
    return value.toLowerCase() || '';
}

export function trim(value: string): string {
    return value.trim();
}

export function toDate(value: string): Date {
    return new Date(value);
}

export function toBoolean(value: string): boolean {
    value = value.toLowerCase();

    return value === 'true' || value === '1' ? true : false;
}

export function toRightNumber(value: string, opts: ToNumberOptions = {}): number {
    let newValue: number = Number.parseInt(value || String(opts.default));

    if (Number.isNaN(newValue)) {
        newValue = opts.default;
    }

    if (opts.min) {
        if (newValue < opts.min) {
            newValue = opts.min;
        }

        if (newValue > opts.max) {
            newValue = opts.max;
        }
    }

    return newValue;
}

export function decimalToString(value: Decimal, decimals = 2): string {
    return value?.toFixed(decimals);
}

const randStr = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const randNum = (length = 1) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toString();
}

// function to ensure that the value is an array if single value is passed
export function ensureArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

export { randStr, randNum };