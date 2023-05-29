// Source (MIT): https://github.com/rehypejs/rehype-slug
import Slugger from "github-slugger";
import type { Root } from "hast";
import { hasProperty } from "hast-util-has-property";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const slugs = new Slugger();

/**
 * Plugin to add `id`s to headings.
 */
const rehypeSlug: Plugin<any[], Root> = () => {
  return (tree) => {
    slugs.reset();

    visit(tree, "element", (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, "id")) {
        node.properties.id = slugs.slug(toString(node));
      }
    });
  };
};

export default rehypeSlug;
