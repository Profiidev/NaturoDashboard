import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase/pocketbase';
import PocketBase from 'pocketbase';
import { exec, execSync } from 'node:child_process';
import { SECRET_SSH_PASSWORD } from '$env/static/private';

const headers = {
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': '*'
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
	
	let result = execSync(`echo ${SECRET_SSH_PASSWORD} | sudo -S systemctl status ${app} | grep "Active: "`);
	let status = 'stopped';
	if (result.toString().indexOf(' active ')) {
		console.log('active');
		status = 'running';
	}
	if (result.toString().indexOf(' inactive ')) {
		console.log('inactive');
		status = 'stopped';
	}
		
	return new Response(JSON.stringify({ status: status }), { status: 200, headers: headers });
};
