import { writable } from 'svelte/store';

export const adminUser = writable<AdminUser | null>(null);
