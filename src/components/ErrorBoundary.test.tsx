import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

afterEach(cleanup);

function ThrowError(): React.ReactNode {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Hello</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders default fallback on error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("문제가 발생했습니다")).toBeInTheDocument();
    expect(screen.getByText("다시 시도")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("renders custom fallback on error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div>Custom error</div>}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Custom error")).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
