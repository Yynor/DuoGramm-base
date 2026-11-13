/**
 * DuoGramm hidden-chat preferences.
 *
 * This module stores only per-account chat IDs in this browser. It does not
 * delete, archive, or change chats in Telegram itself.
 *
 * UI integration and secret-key prompt are intentionally separate follow-up
 * work: do not treat this utility alone as a finished hidden-chats feature.
 */

const STORAGE_PREFIX = 'duogramm:hidden-chats:v1:';

function storageKey(accountId: string | number): string {
  return `${STORAGE_PREFIX}${String(accountId)}`;
}

function readIds(accountId: string | number): string[] {
  try {
    const raw = localStorage.getItem(storageKey(accountId));
    if(!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if(!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((value): value is string => typeof value === 'string'))];
  } catch {
    return [];
  }
}

function writeIds(accountId: string | number, ids: string[]): void {
  localStorage.setItem(storageKey(accountId), JSON.stringify([...new Set(ids)]));
}

export function getHiddenChatIds(accountId: string | number): string[] {
  return readIds(accountId);
}

export function isChatHidden(accountId: string | number, chatId: string | number): boolean {
  return readIds(accountId).includes(String(chatId));
}

export function setChatHidden(
  accountId: string | number,
  chatId: string | number,
  hidden: boolean
): void {
  const id = String(chatId);
  const ids = readIds(accountId).filter((item) => item !== id);
  if(hidden) ids.push(id);
  writeIds(accountId, ids);
}

export function toggleChatHidden(accountId: string | number, chatId: string | number): boolean {
  const nextHidden = !isChatHidden(accountId, chatId);
  setChatHidden(accountId, chatId, nextHidden);
  return nextHidden;
}

export function clearHiddenChats(accountId: string | number): void {
  localStorage.removeItem(storageKey(accountId));
}
