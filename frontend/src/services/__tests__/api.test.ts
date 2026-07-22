import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getExpenses,
  fetchCategories,
  createCategory,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api";

function mockResponse(overrides: Partial<Response> = {}) {
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    ...overrides,
  } as unknown as Response;
}

describe("api service", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("getExpenses appends year, month, page and per_page", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({
        json: async () => ({
          expenses: [],
          meta: {
            current_page: 1,
            per_page: 10,
            total_pages: 1,
            total_count: 0,
          },
        }),
      }),
    );

    await getExpenses(2024, 1, 1, 10);

    const [url] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe(
      "http://localhost:3000/api/expenses?year=2024&month=1&page=1&per_page=10",
    );
  });

  it("fetchCategories returns categories", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ json: async () => [{ id: 1, name: "Food" }] }),
    );

    const result = await fetchCategories();
    expect(result).toEqual([{ id: 1, name: "Food" }]);
  });

  it("createCategory sends POST body", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ json: async () => ({ id: 1, name: "Utilities" }) }),
    );

    await createCategory("Utilities");

    const [url, options] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(url).toBe("http://localhost:3000/api/categories");
    expect(options.method).toBe("POST");
    expect(options.body).toBe(
      JSON.stringify({ category: { name: "Utilities" } }),
    );
  });

  it("createExpense sends parsed payload", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ json: async () => ({ id: 1 }) }),
    );

    await createExpense({
      amount: "10.50",
      description: "Lunch",
      category_id: "1",
      date: "2024-01-01",
    });

    const [, options] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body);
    expect(body.expense.amount).toBe(10.5);
    expect(body.expense.description).toBe("Lunch");
  });

  it("updateExpense sends PUT body", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ json: async () => ({ id: 1 }) }),
    );

    await updateExpense(1, { amount: "20.00" });

    const [url, options] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(url).toBe("http://localhost:3000/api/expenses/1");
    expect(options.method).toBe("PUT");
    const body = JSON.parse(options.body);
    expect(body.expense.amount).toBe(20);
  });

  it("deleteExpense calls DELETE", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse({ status: 204, ok: true }),
    );

    await deleteExpense(1);

    const [url, options] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(url).toBe("http://localhost:3000/api/expenses/1");
    expect(options.method).toBe("DELETE");
  });
});
