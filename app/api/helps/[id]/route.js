import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE = 'helps.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}

function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(req, context) {
  const { id } = await context.params;
  const helps = load();
  const entry = helps.find(h => h._id === id);
  if (!entry) {
    return NextResponse.json({ error: 'Help entry not found' }, { status: 404 });
  }
  return NextResponse.json(entry);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const helps = load();
  const body = await req.json();
  const idx = helps.findIndex(h => h._id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Help entry not found' }, { status: 404 });
  }
  helps[idx] = { ...helps[idx], ...body };
  save(helps);
  return NextResponse.json(helps[idx]);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  let helps = load();
  const exists = helps.some(h => h._id === id);
  helps = helps.filter(h => h._id !== id);
  save(helps);
  return exists
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Help entry not found' }, { status: 404 });
}
