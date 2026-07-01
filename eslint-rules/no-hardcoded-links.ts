import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Rule } from 'eslint'

import { links } from '../src/shared/constants/links.ts'

const here = dirname(fileURLToPath(import.meta.url))
const linksFile = resolve(here, '../src/shared/constants/links.ts')

function canonicalize(raw: string): string | null {
  const trimmed = raw.trim()
  if (trimmed === '') return null

  if (URL.canParse(trimmed)) {
    const url = new URL(trimmed)
    if (url.protocol === 'mailto:') {
      return `mailto:${url.pathname.toLowerCase()}`
    }
    const path = url.pathname.replace(/\/+$/, '')
    return `${url.protocol.toLowerCase()}//${url.hostname.toLowerCase()}${path}${url.search}${url.hash}`
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return `mailto:${trimmed.toLowerCase()}`
  }

  return null
}

const lookup = new Map<string, string>()
for (const [key, value] of Object.entries(links)) {
  const canonical = canonicalize(value)
  if (canonical !== null) lookup.set(canonical, key)
}

const noHardcodedLinks: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow hardcoded values that live in @/shared/constants/links — import from the constant instead.',
    },
    schema: [],
    messages: {
      useConstant:
        "Hardcoded '{{value}}' — import links.{{key}} from '@/shared/constants/links' so this value has a single source of truth.",
    },
  },
  create(context) {
    if (resolve(context.filename) === linksFile) return {}

    function report(node: Rule.Node, raw: unknown): void {
      if (typeof raw !== 'string') return
      const canonical = canonicalize(raw)
      if (canonical === null) return
      const key = lookup.get(canonical)
      if (key === undefined) return
      context.report({
        node,
        messageId: 'useConstant',
        data: { key, value: raw },
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
        report(node, (node as unknown as { value: string }).value.trim())
      },
    } as unknown as Rule.RuleListener
  },
}

export const noHardcodedLinksPlugin = {
  rules: {
    'no-hardcoded-links': noHardcodedLinks,
  },
}
