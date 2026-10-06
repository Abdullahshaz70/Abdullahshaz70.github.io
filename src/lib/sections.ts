import { sections, type SectionId } from '../content'

/** Number and label for a section, looked up by id so reordering content can't misalign them. */
export function sectionMeta(id: SectionId) {
  const section = sections.find((s) => s.id === id)
  if (!section) throw new Error(`Unknown section: ${id}`)
  return section
}
