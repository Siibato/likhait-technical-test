import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { useDeleteExpense } from "../useDeleteExpense";

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(QueryClientProvider, {
    client: new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    }),
    children,
  });

function mockResponse(overrides: Partial<Response> = {}) {
  return {
    ok: true,
    status: 204,
    json: async () => ({}),
    ...overrides,
  } as unknown as Response;
}

describe("useDeleteExpense", () => {
  it("mutates successfully", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse()));

    const { result } = renderHook(() => useDeleteExpense(), { wrapper });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    vi.unstubAllGlobals();
  });
});
