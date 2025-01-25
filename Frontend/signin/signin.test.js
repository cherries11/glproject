import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signin from "./signin"; 

describe("Signin Component", () => {
  test("renders the Signin component", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    // Check that essential elements render correctly
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Example@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/At least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test("updates email and password state on input", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Example@email.com/i);
    const passwordInput = screen.getByPlaceholderText(/At least 8 characters/i);

    // Simulate typing into the email and password fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    // Assert the inputs reflect the typed values
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("Password123!");
  });

  test("displays validation errors for invalid email and password", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    const signInButton = screen.getByText(/Sign in/i);

    // Simulate form submission without filling in the fields
    fireEvent.click(signInButton);

    // Check for validation errors
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Your password must meet all the listed requirements/i)).toBeInTheDocument();
  });

  test("navigates to Forgot Password page when the link is clicked", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    const forgotPasswordLink = screen.getByText(/Forgot Password\?/i);

    // Simulate clicking the forgot password link
    fireEvent.click(forgotPasswordLink);

    // Verify navigation was triggered
    expect(mockNavigate).toHaveBeenCalledWith("/forgot-password");
  });
});
