import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "@/components/chat/Chat"; // adjust path
import "@testing-library/jest-dom";

describe("Chat Component", () => {
  it("renders chat input", () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
  });

  it("allows user to send a message", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: "Hello AI" } });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText("Hello AI")).toBeInTheDocument();
  });
});
