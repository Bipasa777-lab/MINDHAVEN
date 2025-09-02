import { render, screen } from "@testing-library/react";
import ResourceList from "@/components/resources/ResourceList"; // adjust path
import "@testing-library/jest-dom";

const mockResources = [
  { id: "1", title: "Mindfulness Guide", description: "Article", type: "article", url: "#" },
  { id: "2", title: "Yoga Video", description: "Video", type: "video", url: "#" }
];

describe("ResourceList Component", () => {
  it("renders resources", () => {
    render(<ResourceList resources={mockResources} />);
    expect(screen.getByText("Mindfulness Guide")).toBeInTheDocument();
    expect(screen.getByText("Yoga Video")).toBeInTheDocument();
  });
});
