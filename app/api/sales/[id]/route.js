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

export async function GET(req, context) {
  const { id } = await context.params;
  const sales = load();
  const sale = sales.find(s => s._id === id);
  if (!sale) {
    return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
  }
  return NextResponse.json(sale);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const sales = load();
  const body = await req.json();
  const idx = sales.findIndex(s => s._id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
  }
  sales[idx] = { ...sales[idx], ...body };
  save(sales);
  return NextResponse.json(sales[idx]);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  let sales = load();
  const exists = sales.some(s => s._id === id);
  sales = sales.filter(s => s._id !== id);
  save(sales);
  return exists
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Sale not found' }, { status: 404 });
}
