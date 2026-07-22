import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { useCreateCategory } from "../useCreateCategory";

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

describe("useCreateCategory", () => {
  it("mutates successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockResponse({ json: async () => ({ id: 1, name: "Utilities" }) }),
      ),
    );

    const { result } = renderHook(() => useCreateCategory(), { wrapper });

    act(() => {
      result.current.mutate("Utilities");
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    vi.unstubAllGlobals();
  });
});
