import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { request } from "../apiClient";
import { ApiError } from "../errors";

function mockResponse(overrides: Partial<Response> = {}) {
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    ...overrides,
  } as unknown as Response;
}

describe("apiClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("makes a GET request and returns parsed JSON", async () => {
    const data = { id: 1, name: "Food" };
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ json: async () => data }),
    );

    const result = await request<{ id: number; name: string }>("/categories");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/categories",
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    );
    expect(result).toEqual(data);
  });

  it("appends query parameters", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ json: async () => [] }),
    );

    await request("/expenses", { params: { year: 2024, month: 1 } });

    const [url] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe("http://localhost:3000/api/expenses?year=2024&month=1");
  });

  it("throws ApiError with backend messages for non-ok responses", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({
        ok: false,
        status: 422,
        json: async () => ({ errors: ["Amount is invalid"] }),
      }),
    );

    await expect(request("/expenses")).rejects.toThrow(ApiError);
    await expect(request("/expenses")).rejects.toThrow("Amount is invalid");
  });

  it("throws a generic ApiError when the body has no error messages", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({
        ok: false,
        status: 500,
        json: async () => ({}),
      }),
    );

    await expect(request("/expenses")).rejects.toThrow(
      "Request failed with status 500",
    );
  });
});
