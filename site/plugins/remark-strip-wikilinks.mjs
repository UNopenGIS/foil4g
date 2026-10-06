// The docs are written for Foam, where [[Name]] links to Name.md. Until the
// site resolves those links, show them as plain text: [[Name]] becomes Name,
// [[Name|Alias]] becomes Alias, and a #heading suffix is dropped. Only text
// nodes are touched, so code and inline code keep their brackets.
const WIKILINK = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g;

const walk = (node) => {
  if (node.type === "text") {
    node.value = node.value.replace(WIKILINK, (_, name, alias) => (alias ?? name).trim());
    return;
  }
  for (const child of node.children ?? []) walk(child);
};

export default function remarkStripWikilinks() {
  return (tree) => walk(tree);
}
