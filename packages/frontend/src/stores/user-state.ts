import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { string } from 'yup';
import { browser } from '$app/env';
import { isJust, isNothing } from '@repo/shared';

// NOTE: https://stackoverflow.com/a/68785061
// NOTE: https://supabase-cheatsheet.vercel.app/docs/auth/svelte
const createLocalWritableStore = <T>(key: string, initialValue: T): Writable<T> => {
	const store = writable(initialValue);

	if (!browser) return store;

	const localValue = localStorage.getItem(key);
	if (isJust(localValue)) store.set(JSON.parse(localValue));

	store.subscribe((value) => {
		if (isJust(value)) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.removeItem(key);
		}
	});

	window.addEventListener('storage', () => {
		const localValue = localStorage.getItem(key);

		if (isNothing(localValue)) return;

		const parsedValue = JSON.parse(localValue);
		if (parsedValue !== get(store)) store.set(parsedValue);
	});

	return store;
};

type User = {
	isLoggedIn: boolean;
};

// NOTE: only for UI purposes
// TODO: This for auth: https://github.com/supabase/supabase/issues/491#issuecomment-871863896
// https://lawrencelin.me/posts/supabase-auth
// https://github.com/hiro1107/nestjs-supabase-auth/blob/main/src/passport-supabase.strategy.ts
const createUserState = () => {
	const store = writable<User>({
		isLoggedIn: false
	});
	const { set, update, subscribe } = store;

	/* ACTIONS */
	const logIn = () => {
		set({ isLoggedIn: true });
	};

	const logOut = () => {
		set({ isLoggedIn: false });
	};

	return {
		logIn,
		logOut,
		subscribe
	};
};

export const userState = createUserState();
