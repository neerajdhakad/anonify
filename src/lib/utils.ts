import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//This utility merges all the CSS in a single file

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
