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

export async function GET() {
  const clients = load();
  return NextResponse.json(clients);
}

export async function POST(req) {
  const body = await req.json();
  const clients = load();
  const newClient = { ...body, _id: Date.now().toString() };
  clients.push(newClient);
  save(clients);
  return NextResponse.json(newClient);
}
