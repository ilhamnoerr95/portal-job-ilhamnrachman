import { render } from "@testing-library/react";
import { Tag } from "@/components/atoms/tag";

describe("Tag component", () => {
  it("renders children text", () => {
    const { getByText } = render(<Tag>Hello</Tag>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("applies gray variant as default", () => {
    const { getByText } = render(<Tag>Default</Tag>);
    const tag = getByText("Default");

    expect(tag.className).toMatch(/bg-gray-100/);
    expect(tag.className).toMatch(/text-gray-600/);
  });

  it("applies green variant style", () => {
    const { getByText } = render(<Tag variant="green">Active</Tag>);
    const tag = getByText("Active");

    expect(tag.className).toMatch(/bg-green-100/);
    expect(tag.className).toMatch(/text-green-600/);
  });

  it("applies red variant style", () => {
    const { getByText } = render(<Tag variant="red">Inactive</Tag>);
    const tag = getByText("Inactive");

    expect(tag.className).toMatch(/bg-red-100/);
    expect(tag.className).toMatch(/text-red-600/);
  });

  it("applies custom className", () => {
    const { getByText } = render(<Tag className="custom-class">Test</Tag>);
    expect(getByText("Test").className).toMatch(/custom-class/);
  });
});
