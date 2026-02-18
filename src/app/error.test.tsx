import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ErrorPage from "./error";

afterEach(cleanup);

describe("Error page", () => {
  it("renders error message", () => {
    const error = { message: "Test error message", digest: undefined } as Error & { digest?: string };
    render(<ErrorPage error={error} reset={() => {}} />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("문제가 발생했습니다")).toBeInTheDocument();
  });

  it("calls reset on button click", () => {
    const reset = vi.fn();
    const error = { message: "fail", digest: undefined } as Error & { digest?: string };
    render(<ErrorPage error={error} reset={reset} />);
    fireEvent.click(screen.getByText("다시 시도"));
    expect(reset).toHaveBeenCalledOnce();
  });

  it("shows fallback for empty message", () => {
    const error = { message: "", digest: undefined } as Error & { digest?: string };
    render(<ErrorPage error={error} reset={() => {}} />);
    expect(screen.getByText("알 수 없는 오류가 발생했습니다.")).toBeInTheDocument();
  });
});
