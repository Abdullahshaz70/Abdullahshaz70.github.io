import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { useContent } from '../hooks/useContent'
import { sectionMeta } from '../lib/sections'
import { externalLinkProps } from '../lib/links'
import styles from './Contact.module.css'
import layout from './Section.module.css'

const section = sectionMeta('contact')

export function Contact() {
  // Text comes from data.json → "contact", "person" (email, phone) and "colophon". Empty values are not rendered.
  const { contact, person, colophon } = useContent()
  return (
    <section
      id={section.id}
      className={`grid ${layout.section} ${styles.contact}`}
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <SectionHeader number={section.number} title={contact.title} meta={contact.meta} headingId="contact-title" />

      {(contact.lead || person.email || person.phone) && (
        <Reveal className={styles.body}>
          {contact.lead && <p className={styles.lead}>{contact.lead}</p>}
          {person.email && (
            <a className={styles.email} href={`mailto:${person.email}`}>
              {person.email}
            </a>
          )}
          {person.phone && (
            <a className={styles.phone} href={`tel:${person.phone.replace(/[^\d+]/g, '')}`}>
              {person.phone}
            </a>
          )}
        </Reveal>
      )}

      {contact.channels.length > 0 && (
        <Reveal className={styles.channelsWrap}>
          <ul className={styles.channels}>
            {contact.channels.map((channel, i) => (
              <li key={i}>
                <a href={channel.href} {...externalLinkProps(channel.href)}>
                  <span>{channel.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {(colophon.text || colophon.copyright) && (
        <footer className={styles.footer}>
          {colophon.text && <p className={styles.colophon}>{colophon.text}</p>}
          {colophon.copyright && <p className="label">{colophon.copyright}</p>}
        </footer>
      )}
    </section>
  )
}
