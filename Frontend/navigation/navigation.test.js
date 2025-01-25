import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation1 from './navigation1';
import useSectionNavigation from '../handlenavigatetosection';

jest.mock('../handlenavigatetosection');
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  }),
}));

jest.mock('../languageSwither/languageSwitcher', () => () => <div data-testid="language-switcher">LanguageSwitcher</div>);

describe('Navigation1 Component', () => {
  beforeEach(() => {
    useSectionNavigation.mockReturnValue(jest.fn());
  });

  test('renders the component with logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation1 />
      </MemoryRouter>
    );

    // Check for logo
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText("À Propos")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Offres")).toBeInTheDocument();
    expect(screen.getByText("Loyalty")).toBeInTheDocument();
    expect(screen.getByText("Équipes")).toBeInTheDocument();
    expect(screen.getByText("Contacte")).toBeInTheDocument();
    expect(screen.getByText("Historique")).toBeInTheDocument();

    // Check for account icon and "BOOK NOW" button
    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
    expect(screen.getByText("BOOK NOW")).toBeInTheDocument();
  });

  test('toggles the menu on clicking the hamburger icon', () => {
    render(
      <MemoryRouter>
        <Navigation1 />
      </MemoryRouter>
    );

    const hamburgerIcon = screen.getByRole('button');

    // Initially, navigation links are hidden
    expect(screen.queryByText("À Propos")).not.toBeVisible();

    // Click to open the menu
    fireEvent.click(hamburgerIcon);
    expect(screen.getByText("À Propos")).toBeVisible();

    // Click to close the menu
    fireEvent.click(hamburgerIcon);
    expect(screen.queryByText("À Propos")).not.toBeVisible();
  });

  test('navigates to sections when links are clicked', () => {
    const navigateToSectionMock = jest.fn();
    useSectionNavigation.mockReturnValue(navigateToSectionMock);

    render(
      <MemoryRouter>
        <Navigation1 />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText("À Propos");
    fireEvent.click(aboutLink);

    expect(navigateToSectionMock).toHaveBeenCalledWith("a-propos");
  });

  test('renders the language switcher component', () => {
    render(
      <MemoryRouter>
        <Navigation1 />
      </MemoryRouter>
    );

    const languageSwitcher = screen.getByTestId("language-switcher");
    expect(languageSwitcher).toBeInTheDocument();
  });
});
