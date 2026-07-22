import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useExpenseForm } from "../useExpenseForm";

describe("useExpenseForm", () => {
  it("initializes with default empty values", () => {
    const { result } = renderHook(() => useExpenseForm({ onSubmit: vi.fn() }));

    expect(result.current.formData.amount).toBe("");
    expect(result.current.formData.description).toBe("");
    expect(result.current.formData.category_id).toBe("");
    expect(result.current.formData.date).not.toBe("");
  });

  it("validates required fields", () => {
    const { result } = renderHook(() => useExpenseForm({ onSubmit: vi.fn() }));

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(result.current.errors.amount).toBe("Amount must be greater than 0");
    expect(result.current.errors.description).toBe("Description is required");
    expect(result.current.errors.category_id).toBe("Category is required");
  });

  it("rejects future dates", () => {
    const { result } = renderHook(() => useExpenseForm({ onSubmit: vi.fn() }));
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

    act(() => {
      result.current.handleChange("date", dateStr);
      result.current.handleChange("amount", "10");
      result.current.handleChange("description", "x");
      result.current.handleChange("category_id", "1");
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(result.current.errors.date).toBe("Date cannot be in the future");
  });

  it("submits valid data and resets", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useExpenseForm({ onSubmit }));

    act(() => {
      result.current.handleChange("amount", "10.50");
      result.current.handleChange("description", "Lunch");
      result.current.handleChange("category_id", "1");
      result.current.handleChange("date", "2024-01-01");
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        amount: "10.50",
        description: "Lunch",
        category_id: "1",
        date: "2024-01-01",
      });
      expect(result.current.formData.amount).toBe("");
    });
  });
});
