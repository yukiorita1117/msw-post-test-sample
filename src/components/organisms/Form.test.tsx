import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { cache } from "swr";
import { server } from "../../../.mocks/server";
import { Form } from "./Form";

beforeEach(() => cache.clear());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Form Component test::", async () => {
  test("入力フォームのラベルを確認する", async () => {
    render(<Form />);

    await waitFor(() =>
      expect(screen.getByText(/first name:/i)).toHaveTextContent("First Name")
    );
    await waitFor(() =>
      expect(screen.getByText(/last name:/i)).toHaveTextContent("Last Name")
    );
    cleanup();
  });
  describe("inputに値を入力し、submitする", () => {
    beforeEach(async () => {
      await waitFor(() => render(<Form />));
      await waitFor(() => {
        fireEvent.change(
          screen.getByRole("textbox", {
            name: /last name:/i,
          }),
          { target: { value: "test text" } }
        );
      });
      await waitFor(() =>
        fireEvent.click(
          screen.getByRole("button", {
            name: /submit/i,
          })
        )
      );
    });
    test("送信完了ポップアップ表出を確認する", async () => {
      await waitFor(() =>
        expect(screen.getByRole("dialog")).toHaveTextContent(
          "post response です。"
        )
      );
    });
    cleanup();
  });
});
