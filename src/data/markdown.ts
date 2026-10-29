import { htmlLang, languages, type Lang, type Localized } from '@/i18n/ui';
import { homePath, useTranslations } from '@/i18n/utils';
import {
  about,
  aiHighlights,
  clients,
  education,
  employers,
  experience,
  profile,
  projects,
  skills,
  spokenLanguages,
  testimonials,
} from './profile';

/**
 * Plain-Markdown renderings of the portfolio for language models and other
 * machine readers (served as /llms.txt and /llms-full.txt). Built from the same
 * data as the pages, so they never drift apart.
 */

const labels = {
  email: { pt: 'E-mail', en: 'Email' },
  website: { pt: 'Site', en: 'Website' },
  cv: { pt: 'Currículo (PDF)', en: 'Résumé (PDF)' },
  employers: { pt: 'Empresas', en: 'Employers' },
  clients: { pt: 'Clientes', en: 'Clients' },
  tags: { pt: 'Tecnologias', en: 'Technologies' },
  live: { pt: 'Ao vivo', en: 'Live' },
  translated: { pt: 'traduzido do', en: 'translated from' },
  updated: { pt: 'Atualizado em', en: 'Last updated' },
} satisfies Record<string, Localized>;

const languageName: Localized<Localized> = {
  pt: { pt: 'português', en: 'Portuguese' },
  en: { pt: 'inglês', en: 'English' },
};

const abs = (path: string, site: URL) => new URL(path, site).href;

/** Path of the full Markdown profile for a language. */
export function llmsFullPath(lang: Lang): string {
  return `${homePath(lang)}llms-full.txt`;
}

/** Complete profile in one Markdown document, in the given language. */
export function profileMarkdown(lang: Lang, site: URL): string {
  const t = useTranslations(lang);
  const l = (label: keyof typeof labels) => labels[label][lang];
  const out: string[] = [];
  /** Each argument is one Markdown block; an array is a block of consecutive lines. */
  const push = (...blocks: (string | string[])[]) => {
    for (const block of blocks) out.push(...[block].flat(), '');
  };
  const tags = (list: string[]) => `${l('tags')}: ${list.join(', ')}`;

  push(`# ${profile.name}`, `> ${profile.headline[lang]}. ${profile.intro[lang]}`, [
    ...about.facts.map((f) => `- **${f.label[lang]}:** ${f.value[lang]}`),
    ...(profile.openToWork ? [`- **${t('hero.available')}**`] : []),
    `- **${l('email')}:** ${profile.email}`,
    `- **${l('website')}:** ${abs(homePath(lang), site)}`,
    `- **${l('cv')}:** ${abs(profile.cv[lang], site)}`,
    `- **GitHub:** ${profile.social.github}`,
    `- **LinkedIn:** ${profile.social.linkedin}`,
  ]);

  push(
    `## ${t('about.label')}`,
    ...about.paragraphs[lang],
    about.stats.map((s) => `- **${s.value}** ${s.label[lang]}`),
  );

  push(`## ${t('clients.heading')}`, [
    `- **${l('employers')}:** ${employers.join(', ')}`,
    `- **${l('clients')}:** ${clients.join(', ')}`,
  ]);

  push(`## ${t('ai.label')}`, t('ai.subtitle'));
  for (const item of aiHighlights) {
    push(`### ${item.title[lang]}`, item.text[lang], tags(item.tags));
  }

  push(
    `## ${t('stack.label')}`,
    skills.map((s) => `- **${s.group[lang]}:** ${s.items.join(', ')}`),
  );

  push(`## ${t('nav.experience')}`);
  for (const job of experience) {
    const end = job.end ? job.end[lang] : t('experience.present');
    push(
      `### ${job.role[lang]} — ${job.company}`,
      `${job.context[lang]} · ${job.start[lang]} – ${end} · ${job.mode[lang]}`,
      job.bullets[lang].map((b) => `- ${b}`),
      tags(job.tags),
    );
  }

  push(`## ${t('nav.projects')}`);
  for (const p of projects) {
    const links = [
      p.live && `- ${l('live')}: ${p.live}`,
      p.code && `- ${t('projects.code')}: ${p.code}`,
    ].filter((link): link is string => !!link);
    push(
      `### ${p.name}`,
      `${p.type[lang]} · ${p.period[lang]}`,
      p.description[lang],
      [...p.highlights[lang].map((h) => `- ${h}`), ...links],
      tags(p.tags),
    );
  }

  push(`## ${t('testimonials.label')}`);
  for (const r of testimonials) {
    const source =
      r.translatedFrom && r.translatedFrom !== lang
        ? ` (${l('translated')} ${languageName[r.translatedFrom][lang]})`
        : '';
    push([`> ${r.quote[lang]}`, '>', `> — ${r.name}, ${r.role[lang]}${source} · ${r.linkedin}`]);
  }

  push(
    `## ${t('education.label')}`,
    education.map((e) => `- **${e.degree[lang]}** — ${e.school} (${e.period[lang]})`),
    `## ${t('education.languages')}`,
    spokenLanguages.map((s) => `- ${s.name[lang]}: ${s.level[lang]}`),
  );

  push(`## ${t('contact.label')}`, t('contact.text'), [
    `- ${l('email')}: ${profile.email}`,
    `- LinkedIn: ${profile.social.linkedin}`,
  ]);

  push('---', `${l('updated')}: ${new Date().toISOString().slice(0, 10)}`);
  return out.join('\n').trimEnd() + '\n';
}

/** Short index for language models, following https://llmstxt.org. */
export function llmsIndex(site: URL): string {
  const langs = Object.keys(languages) as Lang[];
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.headline.en}. ${profile.intro.en}`,
    '',
    `Personal portfolio of ${profile.name}, a software engineer based in Rio de Janeiro, Brazil, working remotely worldwide. The site is available in English and Brazilian Portuguese; every page below holds the same facts, so either language works.`,
    '',
    '## Profile',
    '',
    ...langs.map(
      (lang) =>
        `- [${languages[lang]} — full profile](${abs(llmsFullPath(lang), site)}): about, AI work, stack, experience, projects, recommendations, education and contact in Markdown (${htmlLang[lang]})`,
    ),
    ...langs.map(
      (lang) =>
        `- [${languages[lang]} — website](${abs(homePath(lang), site)}): the HTML home page`,
    ),
    '',
    '## Résumé',
    '',
    ...langs.map((lang) => `- [${languages[lang]} — CV (PDF)](${abs(profile.cv[lang], site)})`),
    '',
    '## Contact',
    '',
    `- Email: ${profile.email}`,
    `- [LinkedIn](${profile.social.linkedin})`,
    `- [GitHub](${profile.social.github})`,
    '',
    '## Optional',
    '',
    `- [Source code of this site](${profile.repo})`,
    `- [Sitemap](${abs('/sitemap-index.xml', site)})`,
  ];
  return lines.join('\n') + '\n';
}
