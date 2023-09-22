import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase/pocketbase';
import PocketBase from 'pocketbase';
import { exec } from 'node:child_process';
import { SECRET_SSH_PASSWORD } from '$env/static/private';

const headers = {
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': '*'
};

const cmds: any = {
	musicbot: {
		base: `echo ${SECRET_SSH_PASSWORD} | sudo systemctl `,
		options: { start: 'start musicbot', stop: 'stop musicbot', restart: 'restart musicbot' }
	},
	lavalink: {
		base: `echo ${SECRET_SSH_PASSWORD} | sudo systemctl `,
		options: { start: 'start lavalink', stop: 'stop lavalink', restart: 'restart lavalink' }
	}
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
	const cmd = body.cmd;
	if (!token || !app || !cmd) {
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
	console.log(`Incoming request from ${e.getClientAddress()} with app: ${app} and command: ${cmd}`);
	console.log(`${cmds[app].base}${cmds[app].options[cmd]}`);
	exec(`${cmds[app].base}${cmds[app].options[cmd]}`, (err, output) => {console.log(err)});

	return new Response(JSON.stringify({ message: 'Done' }), { status: 200, headers: headers });
};
