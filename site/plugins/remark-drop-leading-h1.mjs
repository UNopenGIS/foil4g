// Each card starts with a # heading that repeats its title, which Starlight
// already renders from frontmatter. Drop that first heading so the title
// does not appear twice. Headings anywhere else are left alone.
export default function remarkDropLeadingH1() {
  return (tree) => {
    const first = tree.children[0];
    if (first?.type === "heading" && first.depth === 1) tree.children.shift();
  };
}
