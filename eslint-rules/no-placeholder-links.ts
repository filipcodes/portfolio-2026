import type { Rule } from 'eslint'

const PLACEHOLDER_URL = /^https?:\/\/$/i

const noPlaceholderLinks: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Disallow scheme-only placeholder URLs ('http://' or 'https://') — they ship as dead links.",
    },
    schema: [],
    messages: {
      deadLink:
        "'{{value}}' is a placeholder that ships as a dead link — replace it with a real URL.",
    },
  },
  create(context) {
    function report(node: Rule.Node, raw: unknown): void {
      if (typeof raw !== 'string') return
      const trimmed = raw.trim()
      if (!PLACEHOLDER_URL.test(trimmed)) return
      context.report({
        node,
        messageId: 'deadLink',
        data: { value: trimmed },
      })
    }

    return {
      Literal(node: Rule.Node) {
        if (node.type !== 'Literal') return
        report(node, node.value)
      },
      TemplateElement(node: Rule.Node) {
        if (node.type !== 'TemplateElement') return
        report(node, node.value.cooked)
      },
      JSXText(node: Rule.Node) {
        report(node, (node as unknown as { value: string }).value)
      },
    } as unknown as Rule.RuleListener
  },
}

export const noPlaceholderLinksPlugin = {
  rules: {
    'no-placeholder-links': noPlaceholderLinks,
  },
}
