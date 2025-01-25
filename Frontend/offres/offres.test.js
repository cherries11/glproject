import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Offres from './offres';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking data import
jest.mock('../data/data', () => ({
  coiffure: {
    subServices: {
      "cut": [{ workerName: "John", service: "Haircut", price: "$50", workerImage: "worker.jpg" }],
      "color": [{ workerName: "Alice", service: "Hair Color", price: "$70", workerImage: "worker2.jpg" }],
    }
  }
}));

// Mocking the navigate function
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, ...props }) => <a {...props}>{children}</a>
}));

describe('Offres Component', () => {
  test('renders the Offres component with services', () => {
    render(
      <Router>
        <Offres />
      </Router>
    );

    // Check if popular services are shown
    expect(screen.getByText(/Popular Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a Service/i)).toBeInTheDocument();
  });

  test('filters workers based on search input', async () => {
    render(
      <Router>
        <Offres />
      </Router>
    );

    // Simulate typing in the search field
    const searchInput = screen.getByPlaceholderText(/Search for a service.../i);
    fireEvent.change(searchInput, { target: { value: 'Haircut' } });

    // Check if the filtered worker is displayed
    await waitFor(() => {
      expect(screen.getByText(/Haircut/i)).toBeInTheDocument();
    });
  });

  test('toggles category visibility on click', async () => {
    render(
      <Router>
        <Offres />
      </Router>
    );

    // Find the category button and click it
    const categoryButton = screen.getByText(/Coiffure/i);
    fireEvent.click(categoryButton);

    // Check if the subservice options are visible
    await waitFor(() => {
      expect(screen.getByText(/cut/i)).toBeInTheDocument();
    });

    // Click again to toggle visibility off
    fireEvent.click(categoryButton);

    // Ensure the subservice options are not visible anymore
    await waitFor(() => {
      expect(screen.queryByText(/cut/i)).toBeNull();
      expect(screen.queryByText(/color/i)).toBeNull();
    });
  });

  test('selects a worker and navigates to /book', async () => {
    const mockNavigate = jest.fn();
    render(
      <Router>
        <Offres />
      </Router>
    );

    // Simulate selecting a worker
    const selectButton = screen.getByText(/Select/i);
    fireEvent.click(selectButton);

    // Check if the navigate function is called with the selected workers
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/book',
        expect.objectContaining({
          state: expect.objectContaining({
            selectedWorkers: expect.arrayContaining([
              expect.objectContaining({
                workerName: "John",
                service: "Haircut",
                price: "$50",
                workerImage: "worker.jpg"
              })
            ])
          })
        })
      );
    });
  });
});
