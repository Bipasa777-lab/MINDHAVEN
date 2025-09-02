import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "@/components/booking/BookingForm"; // adjust path
import "@testing-library/jest-dom";

describe("BookingForm Component", () => {
  it("renders booking form fields", () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  it("submits booking request", () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-09-10" } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: "14:00" } });
    fireEvent.click(screen.getByRole("button", { name: /book now/i }));

    expect(screen.getByText(/booking submitted/i)).toBeInTheDocument();
  });
});
