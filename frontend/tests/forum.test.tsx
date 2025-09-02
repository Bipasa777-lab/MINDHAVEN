import { render, screen, fireEvent } from "@testing-library/react";
import Forum from "@/components/forum/Forum"; // adjust path
import "@testing-library/jest-dom";

describe("Forum Component", () => {
  it("renders forum post input", () => {
    render(<Forum />);
    expect(screen.getByPlaceholderText(/write a post/i)).toBeInTheDocument();
  });

  it("allows user to create a post", () => {
    render(<Forum />);
    fireEvent.change(screen.getByPlaceholderText(/write a post/i), { target: { value: "My first post" } });
    fireEvent.click(screen.getByRole("button", { name: /post/i }));

    expect(screen.getByText("My first post")).toBeInTheDocument();
  });
});
