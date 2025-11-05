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

export async function GET(req, context) {
  const { id } = await context.params;
  const orders = load();
  const order = orders.find(o => o._id === id);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const orders = load();
  const body = await req.json();
  const idx = orders.findIndex(o => o._id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  orders[idx] = { ...orders[idx], ...body };
  save(orders);
  return NextResponse.json(orders[idx]);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  let orders = load();
  const exists = orders.some(o => o._id === id);
  orders = orders.filter(o => o._id !== id);
  save(orders);
  return exists
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Order not found' }, { status: 404 });
}
