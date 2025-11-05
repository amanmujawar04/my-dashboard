import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
const FILE = 'clients.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}

function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function PUT(req, context) {
  const { params } = context;
  const { id } = await params; //  Await params
  const clients = load();
  const body = await req.json();
  const idx = clients.findIndex((c) => c._id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  clients[idx] = { ...clients[idx], ...body };
  save(clients);
  return NextResponse.json(clients[idx]);
}

export async function DELETE(req, context) {
  const { params } = context;
  const { id } = await params; //  Await params
  let clients = load();
  clients = clients.filter((c) => c._id !== id);
  save(clients);
  return NextResponse.json({ success: true });
}
