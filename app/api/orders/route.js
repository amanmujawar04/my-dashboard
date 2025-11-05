import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE = 'orders.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}
function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const orders = load();
  return NextResponse.json(orders);
}

export async function POST(req) {
  const body = await req.json();
  const orders = load();
  const newOrder = { ...body, _id: Date.now().toString() };
  orders.push(newOrder);
  save(orders);
  return NextResponse.json(newOrder);
}
