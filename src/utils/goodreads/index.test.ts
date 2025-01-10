import { describe, it, expect } from "vitest";
import { changeGoodreadsImageSize, extractGoodreadsSeriesId } from "./index";

describe("extractGoodreadsSeriesId", () => {
  it("extracts series ID from the full URL", () => {
    expect(
      extractGoodreadsSeriesId(
        "https://goodreads.com/series/40910-the-mistborn-saga"
      )
    ).toBe("40910");
  });

  it("extracts series ID from the path name with id and name", () => {
    expect(extractGoodreadsSeriesId("/series/40910-the-mistborn-saga")).toBe(
      "40910"
    );
  });

  it("extracts series ID from the path name with just id", () => {
    expect(extractGoodreadsSeriesId("/series/40910")).toBe("40910");
  });

  it("returns empty string for invalid URL", () => {
    expect(extractGoodreadsSeriesId("invalid")).toBe("");
  });
});

describe("changeGoodreadsImageSize", () => {
  it("should update existing _SX size parameter", () => {
    const url =
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30._SX600_.jpg";
    const result = changeGoodreadsImageSize(url, 300);
    expect(result).toBe(
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30._SX300_.jpg"
    );
  });

  it("should convert _SY to _SX size parameter", () => {
    const url =
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562726234i/13496._SY75_.jpg";
    const result = changeGoodreadsImageSize(url, 300);
    expect(result).toBe(
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562726234i/13496._SX300_.jpg"
    );
  });

  it("should add _SX size parameter if none exists", () => {
    const url =
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30.jpg";
    const result = changeGoodreadsImageSize(url, 300);
    expect(result).toBe(
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30._SX300_.jpg"
    );
  });

  it("should handle different size numbers", () => {
    const url =
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30._SX600_.jpg";
    const result = changeGoodreadsImageSize(url, 900);
    expect(result).toBe(
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/30._SX900_.jpg"
    );
  });

  it("should handle URLs with different book IDs", () => {
    const url =
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/12345._SX600_.jpg";
    const result = changeGoodreadsImageSize(url, 300);
    expect(result).toBe(
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1656625315i/12345._SX300_.jpg"
    );
  });
});
