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

export async function GET(req, context) {
  const { id } = await context.params;
  const messages = load();
  const message = messages.find(m => m._id === id);
  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  return NextResponse.json(message);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const messages = load();
  const body = await req.json();
  const idx = messages.findIndex(m => m._id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  messages[idx] = { ...messages[idx], ...body };
  save(messages);
  return NextResponse.json(messages[idx]);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  let messages = load();
  const exists = messages.some(m => m._id === id);
  messages = messages.filter(m => m._id !== id);
  save(messages);
  return exists
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Message not found' }, { status: 404 });
}
