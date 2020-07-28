import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Beer from "./Beer";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const mockBeer = { min: 3, max: 5, current: 8, id: "test" };

it("can render and update a Beer", () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Beer beer={{ min: 3, max: 5, current: 8, id: "test" }} />, container);
  });
  const beerName = container.querySelector(".beer-name-label");
  const beerMin = container.querySelector(".min-temp");
  const beerMax = container.querySelector(".max-temp");
  const beerCurrent = container.querySelector(".current-label");
  expect(beerName.textContent).toBe(mockBeer.id);
  expect(parseInt(beerMin.textContent)).toBe(mockBeer.min);
  expect(parseInt(beerMax.textContent)).toBe(mockBeer.max);
  expect(parseInt(beerCurrent.textContent)).toBe(mockBeer.current);
});
