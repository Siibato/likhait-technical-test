import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { useExpenses } from "../useExpenses";

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(QueryClientProvider, {
    client: new QueryClient({
      defaultOptions: { queries: { retry: false } },
    }),
    children,
  });

describe("useExpenses", () => {
  it("fetches expenses for the given year/month", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          expenses: [{ id: 1, amount: 10 }],
          meta: {
            current_page: 1,
            per_page: 10,
            total_pages: 1,
            total_count: 1,
          },
        }),
      } as unknown as Response),
    );

    const { result } = renderHook(() => useExpenses(2024, 1, 1), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.expenses).toHaveLength(1);
    expect(result.current.data?.meta.total_count).toBe(1);

    vi.unstubAllGlobals();
  });
});
