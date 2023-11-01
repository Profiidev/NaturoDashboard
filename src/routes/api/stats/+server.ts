import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase/pocketbase';
import PocketBase from 'pocketbase';
import { readFileSync } from 'fs';

const headers = {
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': '*'
};

const paths: any = {
	cpu: '/home/NaturoDashboard/stats/cpu.txt',
	ram: '/home/NaturoDashboard/stats/mem.txt',
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
	const resource = body.resource;
	const time = body.time;
	if (!token || !resource || !time && time !== 0 && time <= 60) {
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
	
	const path = paths[resource];
	let data = readFileSync(path, 'utf-8').split('\n');
	data.pop();
	let dataClean = data.slice(time * -1).map((x) => x.replace(/\r/g, '').replace(/,/g, '.'));

	let usagePercent: number[] = [];
	let usageAbsolute: number[] = [];

	if (resource === 'ram') {
		dataClean.forEach((x) => {
			let temp = x.split(' ');
			usagePercent.push(Number(temp[0]));
			usageAbsolute.push(Number(temp[1]));
		});
	} else if (resource === 'cpu') {
		dataClean.forEach((x) => {
			let temp = x.split('. ');
			usagePercent.push(Number(temp[0]));
		});
	} else {
		usagePercent = dataClean.map(Number).map(x => x / 2);
	}

	return new Response(JSON.stringify({ data: usagePercent, data2: usageAbsolute }), {
		status: 200,
		headers: headers
	});
};
