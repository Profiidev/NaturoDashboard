import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://nacktebusen.de:8091');
export const currentUser = writable(pb.authStore.model);
export const token = writable(pb.authStore.token);

pb.authStore.onChange((auth) => {
  currentUser.set(pb.authStore.model);
  token.set(pb.authStore.token);
});