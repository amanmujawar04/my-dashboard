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

export async function GET(req, context) {
  const { id } = await context.params;
  const products = load();
  const product = products.find(p => p._id === id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const products = load();
  const body = await req.json();
  const idx = products.findIndex(p => p._id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  products[idx] = { ...products[idx], ...body };
  save(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  let products = load();
  const exists = products.some(p => p._id === id);
  products = products.filter(p => p._id !== id);
  save(products);
  return exists
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Product not found' }, { status: 404 });
}
