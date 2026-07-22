import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { useUpdateExpense } from "../useUpdateExpense";

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

describe("useUpdateExpense", () => {
  it("mutates successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockResponse({
          json: async () => ({
            id: 1,
            amount: 20,
            description: "Updated",
            category: "Food",
            date: "2024-01-01",
          }),
        }),
      ),
    );

    const { result } = renderHook(() => useUpdateExpense(), { wrapper });

    act(() => {
      result.current.mutate({ id: 1, data: { amount: "20" } });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    vi.unstubAllGlobals();
  });
});
