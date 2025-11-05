import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE = 'sales.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}
function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const sales = load();
  return NextResponse.json(sales);
}

export async function POST(req) {
  const body = await req.json();
  const sales = load();
  const newSale = { ...body, _id: Date.now().toString() };
  sales.push(newSale);
  save(sales);
  return NextResponse.json(newSale);
}
