import { render, fireEvent } from "@testing-library/react";
import SpesialState from "@/components/atoms/SpesialState";

describe("SpesialState Component", () => {
  const mockImage = "/test-image.png";

  it("renders default title", () => {
    const { getByText } = render(<SpesialState image={mockImage} />);
    expect(getByText("No job openings available")).toBeInTheDocument();
  });

  it("renders custom title and text", () => {
    const { getByText } = render(
      <SpesialState image={mockImage} title="Custom Title" text="This is a description" />
    );

    expect(getByText("Custom Title")).toBeInTheDocument();
    expect(getByText("This is a description")).toBeInTheDocument();
  });

  it("does not render button when btn=false", () => {
    const { queryByRole } = render(<SpesialState image={mockImage} text="No button" />);
    const button = queryByRole("button");
    expect(button).toBeNull();
  });

  it("renders button when btn=true and triggers handleOpen on click", () => {
    const handleOpen = jest.fn();
    const { getByRole } = render(<SpesialState image={mockImage} btn handleOpen={handleOpen} />);

    const button = getByRole("button", { name: /create a new job/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });
});
