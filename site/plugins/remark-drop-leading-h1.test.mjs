import { test } from "node:test";
import assert from "node:assert/strict";
import remarkDropLeadingH1 from "./remark-drop-leading-h1.mjs";

const run = (children) => {
  const tree = { type: "root", children };
  remarkDropLeadingH1()(tree);
  return tree.children.map((n) => `${n.type}${n.depth ?? ""}`);
};
const h = (depth) => ({ type: "heading", depth, children: [{ type: "text", value: "x" }] });
const p = { type: "paragraph", children: [{ type: "text", value: "y" }] };

test("drops a level-1 heading at the top", () => {
  assert.deepEqual(run([h(1), p, h(2)]), ["paragraph", "heading2"]);
});

test("keeps a level-1 heading that is not first", () => {
  assert.deepEqual(run([p, h(1)]), ["paragraph", "heading1"]);
});

test("keeps a level-2 heading at the top", () => {
  assert.deepEqual(run([h(2), p]), ["heading2", "paragraph"]);
});

test("handles an empty document", () => {
  assert.deepEqual(run([]), []);
});
