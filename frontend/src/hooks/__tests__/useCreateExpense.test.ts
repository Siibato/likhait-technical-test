import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { useCreateExpense } from "../useCreateExpense";

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
    status: 200,
    json: async () => ({}),
    ...overrides,
  } as unknown as Response;
}

describe("useCreateExpense", () => {
  it("mutates successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockResponse({
          json: async () => ({
            id: 1,
            amount: 10,
            description: "Lunch",
            category: "Food",
            date: "2024-01-01",
          }),
        }),
      ),
    );

    const { result } = renderHook(() => useCreateExpense(), { wrapper });

    act(() => {
      result.current.mutate({
        amount: "10",
        description: "Lunch",
        category_id: "1",
        date: "2024-01-01",
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    vi.unstubAllGlobals();
  });
});
