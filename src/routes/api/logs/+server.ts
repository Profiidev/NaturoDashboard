import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase/pocketbase';
import PocketBase from 'pocketbase';
import { readFileSync } from 'fs';

const headers = {
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': '*'
};

const apps: any = {
	minecraft: 'tests/Lavalink.log',
	musicbot: '/home/Musikbot/Musicbot.log',
	lavalink: '/home/Musikbot/Lavalink.log'
};

export const POST: RequestHandler = async (e: RequestEvent) => {
	let body;
	try {
		body = await e.request.json();
	} catch (e) {
		return new Response(JSON.stringify({ message: 'Invalid Body' }), {
			status: 400,
			headers: headers
		});
	}

	const token = body.token;
	const app = body.app;
	if (!token || !app) {
		return new Response(JSON.stringify({ message: 'Invalid Params' }), {
			status: 400,
			headers: headers
		});
	}

	let isValid = false;
	try {
		const temp = new PocketBase(pb.baseUrl);
		temp.authStore.save(token, null);
		if (temp.authStore.isValid) {
			await temp.collection('users').authRefresh();
			isValid = true;
		}
	} catch (_) {}
	if (!isValid) {
		return new Response(JSON.stringify({}), { status: 401, headers: headers });
	}

	const data = readFileSync(apps[app], 'utf-8');
	const logs = data.replace(/\r/g, '').split('\n');

	return new Response(JSON.stringify({ logs: logs }), { status: 200, headers: headers });
};
