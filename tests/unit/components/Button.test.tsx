import { render, fireEvent } from "@testing-library/react";
import { Button } from "@/components/atoms/button";

describe("Button component", () => {
  it("renders with children label", () => {
    const { getByRole } = render(<Button>Test</Button>);
    expect(getByRole("button", { name: /test/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(getByRole("button", { name: "Submit" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled prop is true", () => {
    const { getByRole } = render(<Button disabled>Submit</Button>);
    expect(getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("shows loading state when isLoading is true", () => {
    const { getByRole } = render(
      <Button isLoading loadingName="Loading...">
        Submit
      </Button>
    );
    const button = getByRole("button", { name: /loading.../i });

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Loading...");
  });

  it('applies "font-semibold" when variant is NOT "normal"', () => {
    const { getByRole } = render(<Button variant="primary">Click</Button>);
    const button = getByRole("button");

    expect(button.className).toMatch(/font-semibold/);
    expect(button.className).not.toMatch(/font-normal/);
  });

  it("applies full width style when fullWidth is true", () => {
    const { getByRole } = render(<Button fullWidth>Click</Button>);
    expect(getByRole("button").className).toMatch(/w-full/);
  });

  it("applies correct size class based on size prop", () => {
    const { getByRole } = render(<Button size="lg">Click</Button>);
    const button = getByRole("button");

    // lg = "text-base px-5 py-3 rounded-full"
    expect(button.className).toMatch(/text-base/);
    expect(button.className).toMatch(/px-5/);
    expect(button.className).toMatch(/py-3/);
  });
});
