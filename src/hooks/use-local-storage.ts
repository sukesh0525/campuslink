"use client";

import { useState, useEffect, useCallback } from "react";

function getStoredValue<T>(key: string, initialValue: T | (() => T)): T {
    if (typeof window === "undefined") {
        return initialValue instanceof Function ? initialValue() : initialValue;
    }
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : (initialValue instanceof Function ? initialValue() : initialValue);
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
        return initialValue instanceof Function ? initialValue() : initialValue;
    }
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        setStoredValue(getStoredValue(key, initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error(`Error setting localStorage key “${key}”:`, error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue] as const;
}
