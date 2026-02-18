import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Loading page", () => {
  it("renders loading text", () => {
    render(<Loading />);
    expect(screen.getByText("로딩 중...")).toBeInTheDocument();
  });

  it("renders spinner", () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
