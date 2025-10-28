import { render } from "@testing-library/react";
import { Card } from "@/components/atoms/card";

describe("Card component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Card>Content</Card>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("has default shadow and border", () => {
    const { getByText } = render(<Card>Content</Card>);
    const card = getByText("Content").closest("div") as HTMLElement;

    expect(card.className).toMatch(/shadow-md/);
    expect(card.className).toMatch(/border/);
    expect(card.className).toMatch(/border-gray-200/);
  });

  it("removes shadow when shadow=false", () => {
    const { getByText } = render(<Card shadow={false}>No Shadow</Card>);
    const card = getByText("No Shadow").closest("div") as HTMLElement;

    expect(card.className).not.toMatch(/shadow-md/);
  });

  it("applies hoverable styles when hoverable=true", () => {
    const { getByText } = render(<Card hoverable>Hoverable</Card>);
    const card = getByText("Hoverable").closest("div") as HTMLElement;

    expect(card.className).toMatch(/hover:shadow-lg/);
    expect(card.className).toMatch(/hover:scale-\[1\.01\]/);
  });

  it("accepts custom className", () => {
    const { getByText } = render(<Card className="bg-red-500">Styled</Card>);
    const card = getByText("Styled").closest("div") as HTMLElement;

    expect(card.className).toMatch(/bg-red-500/);
  });

  it('renders with custom element when using "as" prop', () => {
    const { getByText } = render(<Card as="section">Section</Card>);
    const card = getByText("Section");

    expect(card.tagName).toBe("SECTION");
  });

  it("applies padding size", () => {
    const { getByText } = render(<Card padding="p-10">Big Space</Card>);
    const card = getByText("Big Space");

    expect(card.className).toMatch(/p-10/);
  });
});
