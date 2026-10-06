import { test } from "node:test";
import assert from "node:assert/strict";
import remarkStripWikilinks from "./remark-strip-wikilinks.mjs";

const run = (tree) => {
  remarkStripWikilinks()(tree);
  return tree;
};
const para = (...children) => ({ type: "root", children: [{ type: "paragraph", children }] });
const text = (value) => ({ type: "text", value });

test("replaces a wikilink with its name", () => {
  const tree = run(para(text("データは [[OpenStreetMap]] が元です")));
  assert.equal(tree.children[0].children[0].value, "データは OpenStreetMap が元です");
});

test("uses the alias when one is given", () => {
  const tree = run(para(text("[[UCDP 武力紛争データ|UCDP GED]] を見る")));
  assert.equal(tree.children[0].children[0].value, "UCDP GED を見る");
});

test("drops a heading anchor", () => {
  const tree = run(para(text("[[Geofabrik#取り出し方]]")));
  assert.equal(tree.children[0].children[0].value, "Geofabrik");
});

test("handles several wikilinks and Japanese names with spaces", () => {
  const tree = run(para(text("[[国土地理院 淡色地図タイル]]、[[ODbL-1.0]]")));
  assert.equal(tree.children[0].children[0].value, "国土地理院 淡色地図タイル、ODbL-1.0");
});

test("leaves code and inline code untouched", () => {
  const tree = {
    type: "root",
    children: [
      { type: "code", value: "echo [[not a link]]" },
      { type: "paragraph", children: [{ type: "inlineCode", value: "[[kept]]" }] },
    ],
  };
  run(tree);
  assert.equal(tree.children[0].value, "echo [[not a link]]");
  assert.equal(tree.children[1].children[0].value, "[[kept]]");
});

test("leaves text without wikilinks unchanged", () => {
  const tree = run(para(text("[not a wikilink] and [[unclosed")));
  assert.equal(tree.children[0].children[0].value, "[not a wikilink] and [[unclosed");
});
