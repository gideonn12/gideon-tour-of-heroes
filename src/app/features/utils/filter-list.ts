import { Signal } from "@angular/core";

export function filterList<T>(list: Signal<T[]>, query: string, field: keyof T): T[] {
    if (!query) {
        return list();
    }

    return list().filter(item => String(item[field]).toLowerCase().includes(query));
}