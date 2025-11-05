import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE = 'messages.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}

function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const messages = load();
  return NextResponse.json(messages);
}

export async function POST(req) {
  const body = await req.json();
  const messages = load();
  const newMessage = { ...body, _id: Date.now().toString() };
  messages.push(newMessage);
  save(messages);
  return NextResponse.json(newMessage);
}
