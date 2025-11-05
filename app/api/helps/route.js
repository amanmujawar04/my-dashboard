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

export async function GET() {
  const helps = load();
  return NextResponse.json(helps);
}

export async function POST(req) {
  const body = await req.json();
  const helps = load();
  const newHelp = { ...body, _id: Date.now().toString() };
  helps.push(newHelp);
  save(helps);
  return NextResponse.json(newHelp);
}
