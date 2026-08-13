"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  createPersistentStore,
  useHydrated,
  usePersistentValue,
} from "@/lib/persistentStore";
import { readStorage, writeStorage } from "@/lib/storage";
import type { User } from "@/types";

/**
 * Demo authentication.
 *
 * Accounts live in localStorage exactly as they did in the original static
 * build — there is no server and no real credential handling here. Nothing in
 * this file is suitable for production; swap it for a real auth provider
 * (NextAuth, Clerk, a session cookie API) before shipping anything live.
 */
interface StoredAccount extends User {
  password: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextValue {
  user: User | null;
  hydrated: boolean;
  signIn: (email: string, password: string) => AuthResult;
  signUp: (input: SignUpInput) => AuthResult;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const normalise = (email: string) => email.trim().toLowerCase();

const sessionStore = createPersistentStore<User | null>(STORAGE_KEYS.session, null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = usePersistentValue(sessionStore);
  const hydrated = useHydrated();

  const signUp = useCallback((input: SignUpInput): AuthResult => {
    const accounts = readStorage<StoredAccount[]>(STORAGE_KEYS.users, []);
    const email = normalise(input.email);

    if (accounts.some((account) => normalise(account.email) === email)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const account: StoredAccount = { ...input, email };
    writeStorage(STORAGE_KEYS.users, [...accounts, account]);

    const session: User = {
      name: account.name,
      email: account.email,
      mobile: account.mobile,
    };
    sessionStore.set(session);
    return { ok: true };
  }, []);

  const signIn = useCallback((email: string, password: string): AuthResult => {
    const accounts = readStorage<StoredAccount[]>(STORAGE_KEYS.users, []);
    const match = accounts.find(
      (account) => normalise(account.email) === normalise(email),
    );

    // One generic message for both branches so the form never confirms which
    // emails are registered.
    if (!match || match.password !== password) {
      return { ok: false, error: "Email or password is incorrect." };
    }

    const session: User = {
      name: match.name,
      email: match.email,
      mobile: match.mobile,
    };
    sessionStore.set(session);
    return { ok: true };
  }, []);

  const signOut = useCallback(() => sessionStore.set(null), []);

  const value = useMemo(
    () => ({ user, hydrated, signIn, signUp, signOut }),
    [user, hydrated, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
