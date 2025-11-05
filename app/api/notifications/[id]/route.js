import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE = 'notifications.json';

function load() {
  if (!existsSync(FILE)) return [];
  return JSON.parse(readFileSync(FILE, 'utf-8'));
}
function save(data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(req, context) {
  const { id } = await context.params;
  const notifications = load();
  const notification = notifications.find(n => n._id === id);
  if (!notification) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  }
  return NextResponse.json(notification);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const notifications = load();
  const body = await req.json();
  const idx = notifications.findIndex(n => n._id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  }
  notifications[idx] = { ...notifications[idx], ...body };
  save(notifications);
  return NextResponse.json(notifications[idx]);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  let notifications = load();
  const exists = notifications.some(n => n._id === id);
  notifications = notifications.filter(n => n._id !== id);
  save(notifications);
  return exists
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Notification not found' }, { status: 404 });
}
