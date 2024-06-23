import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getSavedValue<T>(key: string, initialValue: T): T {
  const savedValue = JSON.parse(localStorage.getItem(key) || "null");

  if (savedValue !== null) return savedValue;

  return initialValue;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
