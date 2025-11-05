import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE = 'products.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}
function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const products = load();
  return NextResponse.json(products);
}

export async function POST(req) {
  const body = await req.json();
  const products = load();
  const newProduct = { ...body, _id: Date.now().toString() };
  products.push(newProduct);
  save(products);
  return NextResponse.json(newProduct);
}
