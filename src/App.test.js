import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import CreateLogForm from "./CreateLogForm";
import userEvent from "@testing-library/user-event";
import Comment from "./Comment";
import { MemoryRouter, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import NotFound from "./NotFound";
test("test 1: navbars are displaying correctly", () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Create a log/i)).toBeInTheDocument();
  expect(screen.getByText(/Logs/i)).toBeInTheDocument();
  expect(screen.getByText(/Comments/i)).toBeInTheDocument();
});

test("test 2: navbars direct users to the correct pages", () => {
  render(<App />);
  userEvent.click(screen.getByText(/Comments/i));
  // expect(screen.getByText(/Leave Your Comment Here/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Leave Your Comment Here/i })
  ).toBeInTheDocument();
  userEvent.click(screen.getByText(/Create a log/i));
  // expect(screen.getByText(/Create a new log/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Create a new log/i })
  ).toBeInTheDocument();
  userEvent.click(screen.getByText(/Home/i));
  expect(screen.getByAltText(/all/i)).toBeInTheDocument();
});

test("test 3: form validation", () => {
  render(<App />);

  userEvent.click(screen.getByText(/Create a log/i));
  // userEvent.click(screen.getByText(/Create a new log/i));
  userEvent.click(screen.getByRole("button", { name: /create a new log/i }));
  expect(screen.getByText(/Continent cannot be empty/i)).toBeInTheDocument();
});

test("test 4: test selection in form", () => {
  const { getByTestId, getAllByTestId } = render(<CreateLogForm />);
  fireEvent.change(getByTestId("select"), { target: { value: 2 } });
  let options = getAllByTestId("select-option");
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeTruthy();
});
const setup = () => {
  const utils = render(<CreateLogForm />);
  const input = utils.getByTestId("year");
  return {
    input,
    ...utils,
  };
};
test("test 5: number input check in form", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "@asdfghjkl./;'" } });
  expect(input.value).toBe("");
});

test("test 6: clicking the image redirect into the logs page ", () => {
  render(<App />);
  userEvent.click(screen.getByText(/Home/i));
  userEvent.click(screen.getByAltText(/all/i));
  expect(screen.getByText("No records found.")).toBeInTheDocument();
});

test("test 7: all continents are rendered", async () => {
  render(<App />);
  userEvent.click(screen.getByText(/Home/i));
  await waitFor(() => screen.getAllByTestId("accordion"));
  expect(screen.getAllByText(/Show more/i).length).toBe(7);
});

test("test 8: the accordion works", async () => {
  render(<App />);
  userEvent.click(screen.getByText(/Home/i));
  await waitFor(() => screen.getAllByText(/Show/i));
  expect(screen.getAllByText(/Show/i).length).toBe(7);
  let continent_list = screen.getAllByText(/Show/i);
  userEvent.click(continent_list[0]);
  expect(screen.getAllByText(/Show/i).length).toBe(6);
  userEvent.click(continent_list[0]);
  expect(screen.getAllByText(/Show/i).length).toBe(7);
});

test("test 9: click the continent name and redirect", async () => {
  render(<App />);
  userEvent.click(screen.getByText(/Home/i));
  await waitFor(() => screen.getByTestId("Africa"));
  userEvent.click(screen.getByTestId("Africa"));
  expect(screen.getByText("No records found.")).toBeInTheDocument();
});
test("test 10: latest comment ranked first", async () => {
  render(<Comment />);
  await waitFor(() => screen.getAllByTestId("comment_time"));
  let times = screen.getAllByTestId("comment_time");
  if (times.length > 1) {
    expect(times[0].textContent > times[1].textContent).toBeTruthy();
  }
});
test("test 11: 404 page", async () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={["/asdfghj"]}>
      <Route path="" exact>
        <NotFound />
      </Route>
    </MemoryRouter>
  );
  expect(getByTestId("not_found")).toHaveTextContent("404 Not Found");
});
