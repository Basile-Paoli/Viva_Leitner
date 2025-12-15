export const Category = {
  First: "FIRST",
  Second: "SECOND",
  Third: "THIRD",
  Fourth: "FOURTH",
  Fifth: "FIFTH",
  Sixth: "SIXTH",
  Seventh: "SEVENTH",
  Done: "DONE",
} as const;

export type Category = (typeof Category)[keyof typeof Category];
