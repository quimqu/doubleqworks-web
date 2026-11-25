// Genera el web estàtic de doubleqworks.com (GitHub Pages, servit des de l'arrel de main).
// Tots els textos són aquí. Per canviar res: editar, `node build.mjs`, commit i push.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = 'https://doubleqworks.com';
const UPDATED = '2026-11-25';

// Dades legals (LSSI art. 10). Si canvien, només aquí.
const EMPRESA = {
  nom: 'Double Q Works, S.L.U.',
  nif: 'B05823067',
  domicili: 'Carrer Josep Pla i Casadevall, 5, 08310 Argentona (Barcelona)',
  email: 'info@doubleqworks.com',
  full: 'B-665815',
};

// besteed s'ha retirat de les botigues (25/11/2026). Posa-ho a true per tornar a mostrar-la.
const BESTEED_PUBLICADA = false;
const BESTEED_IOS = 'https://apps.apple.com/app/id6807947405';
const BESTEED_PLAY = 'https://play.google.com/store/apps/details?id=app.besteed';

const L = {
  es: {
    htmlLang: 'es', prefix: '/', legalPath: '/aviso-legal/', name: 'Español',
    title: 'Double Q Works — Apps y comercio en línea',
    description: 'Double Q Works, S.L.U. desarrolla apps móviles y gestiona la marca de comercio en línea Smile Items. Argentona (Barcelona).',
    nav: { productos: 'Productos', contacto: 'Contacto', legal: 'Aviso legal' },
    hero: 'Hacemos apps útiles para el día a día.',
    heroSub: 'Double Q Works es una pequeña empresa de Argentona (Barcelona) que diseña, desarrolla y publica aplicaciones móviles, y gestiona la marca de comercio en línea Smile Items.',
    productos: 'Productos',
    besteed: 'Organizador familiar: tareas, lista de la compra, dinero, contratos y papeles, compartidos con quien vives.',
    silncy: 'Botón de pánico discreto: tus contactos de confianza reciben un aviso con tu ubicación en tiempo real, sin sacar el móvil.',
    smile: 'Nuestra marca de comercio electrónico, con venta en Amazon.',
    enDesarrollo: 'En desarrollo',
    disponible: 'Disponible',
    web: 'Web', privacidad: 'Privacidad',
    contacto: 'Contacto',
    contactoText: 'Para cualquier consulta sobre la empresa o sus productos:',
    besteedPriv: 'https://besteed.com/es/privacy/', besteedWeb: 'https://besteed.com/es/', silncyWeb: 'https://silncy.com/es/',
    iosHl: 'es', playHl: 'es',
    legal: {
      title: 'Aviso legal, privacidad y cookies',
      h1: 'Aviso legal',
      intro: 'En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:',
      rows: [
        ['Titular', EMPRESA.nom],
        ['NIF', EMPRESA.nif],
        ['Domicilio social', EMPRESA.domicili + ', España'],
        ['Correo electrónico', EMPRESA.email],
        ['Datos registrales', `Registro Mercantil de Barcelona, hoja ${EMPRESA.full}, inscripción 1.ª`],
      ],
      uso: ['Uso del sitio', 'Este sitio es meramente informativo. Los textos, logotipos y marcas que aparecen en él pertenecen a Double Q Works, S.L.U. o a sus respectivos titulares y no pueden reproducirse sin autorización. Los enlaces a sitios de terceros (App Store, Google Play, Amazon) se ofrecen por comodidad; Double Q Works no responde de su contenido.'],
      privTitle: 'Política de privacidad',
      priv: [
        'Este sitio web no tiene formularios, no pide registro y no recoge datos personales.',
        'El servidor que lo aloja (GitHub Pages, de GitHub, Inc.) puede registrar la dirección IP de los visitantes por motivos técnicos y de seguridad, según su propia política de privacidad.',
        `Si nos escribe a ${EMPRESA.email}, el responsable del tratamiento es Double Q Works, S.L.U. Usaremos sus datos solo para responderle, con base en su consentimiento al escribirnos, y los conservaremos el tiempo necesario para atender su consulta y las obligaciones legales que se deriven. No los cederemos a terceros salvo obligación legal.`,
        `Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${EMPRESA.email}. Si considera que no se han atendido, puede reclamar ante la Agencia Española de Protección de Datos (aepd.es).`,
        'Cada app tiene su propia política de privacidad, enlazada en su ficha de producto:',
      ],
      cookiesTitle: 'Cookies',
      cookies: 'Este sitio no utiliza cookies ni herramientas de analítica o publicidad. Por eso no muestra ningún aviso de cookies.',
      updated: 'Última actualización',
    },
    notFound: ['Página no encontrada', 'Volver al inicio'],
  },
  ca: {
    htmlLang: 'ca', prefix: '/ca/', legalPath: '/ca/avis-legal/', name: 'Català',
    title: 'Double Q Works — Apps i comerç en línia',
    description: 'Double Q Works, S.L.U. desenvolupa apps mòbils i gestiona la marca de comerç en línia Smile Items. Argentona (Barcelona).',
    nav: { productos: 'Productes', contacto: 'Contacte', legal: 'Avís legal' },
    hero: 'Fem apps útils per al dia a dia.',
    heroSub: 'Double Q Works és una petita empresa d\'Argentona (Barcelona) que dissenya, desenvolupa i publica aplicacions mòbils, i gestiona la marca de comerç en línia Smile Items.',
    productos: 'Productes',
    besteed: 'Organitzador familiar: tasques, llista de la compra, diners, contractes i papers, compartits amb qui hi vius.',
    silncy: 'Botó de pànic discret: els teus contactes de confiança reben un avís amb la teva ubicació en temps real, sense treure el mòbil.',
    smile: 'La nostra marca de comerç electrònic, amb venda a Amazon.',
    enDesarrollo: 'En desenvolupament',
    disponible: 'Disponible',
    web: 'Web', privacidad: 'Privacitat',
    contacto: 'Contacte',
    contactoText: 'Per a qualsevol consulta sobre l\'empresa o els seus productes:',
    besteedPriv: 'https://besteed.com/ca/privacy/', besteedWeb: 'https://besteed.com/ca/', silncyWeb: 'https://silncy.com/ca/',
    iosHl: 'es', playHl: 'ca',
    legal: {
      title: 'Avís legal, privacitat i galetes',
      h1: 'Avís legal',
      intro: 'En compliment de l\'article 10 de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s\'informa de les dades del titular d\'aquest lloc web:',
      rows: [
        ['Titular', EMPRESA.nom],
        ['NIF', EMPRESA.nif],
        ['Domicili social', EMPRESA.domicili + ', Espanya'],
        ['Correu electrònic', EMPRESA.email],
        ['Dades registrals', `Registre Mercantil de Barcelona, full ${EMPRESA.full}, inscripció 1a`],
      ],
      uso: ['Ús del lloc', 'Aquest lloc és merament informatiu. Els textos, logotips i marques que hi apareixen pertanyen a Double Q Works, S.L.U. o als seus titulars respectius i no es poden reproduir sense autorització. Els enllaços a llocs de tercers (App Store, Google Play, Amazon) s\'ofereixen per comoditat; Double Q Works no respon del seu contingut.'],
      privTitle: 'Política de privacitat',
      priv: [
        'Aquest lloc web no té formularis, no demana registre i no recull dades personals.',
        'El servidor que l\'allotja (GitHub Pages, de GitHub, Inc.) pot registrar l\'adreça IP dels visitants per motius tècnics i de seguretat, segons la seva pròpia política de privacitat.',
        `Si ens escriviu a ${EMPRESA.email}, el responsable del tractament és Double Q Works, S.L.U. Farem servir les vostres dades només per respondre-us, amb base en el vostre consentiment en escriure'ns, i les conservarem el temps necessari per atendre la consulta i les obligacions legals que se'n derivin. No les cedirem a tercers llevat d'obligació legal.`,
        `Podeu exercir els drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint a ${EMPRESA.email}. Si considereu que no s'han atès, podeu reclamar davant l'Agència Espanyola de Protecció de Dades (aepd.es).`,
        'Cada app té la seva pròpia política de privacitat, enllaçada a la fitxa del producte:',
      ],
      cookiesTitle: 'Galetes',
      cookies: 'Aquest lloc no fa servir galetes ni eines d\'analítica o publicitat. Per això no mostra cap avís de galetes.',
      updated: 'Darrera actualització',
    },
    notFound: ['Pàgina no trobada', 'Tornar a l\'inici'],
  },
  en: {
    htmlLang: 'en', prefix: '/en/', legalPath: '/en/legal/', name: 'English',
    title: 'Double Q Works — Apps and e-commerce',
    description: 'Double Q Works, S.L.U. builds mobile apps and runs the e-commerce brand Smile Items. Argentona (Barcelona, Spain).',
    nav: { productos: 'Products', contacto: 'Contact', legal: 'Legal notice' },
    hero: 'We make useful apps for everyday life.',
    heroSub: 'Double Q Works is a small company based in Argentona (Barcelona, Spain) that designs, develops and publishes mobile apps, and runs the e-commerce brand Smile Items.',
    productos: 'Products',
    besteed: 'Family organiser: tasks, shopping list, money, contracts and paperwork, shared with the people you live with.',
    silncy: 'Discreet panic button: your trusted contacts get an alert with your real-time location, without taking out your phone.',
    smile: 'Our e-commerce brand, sold on Amazon.',
    enDesarrollo: 'In development',
    disponible: 'Available',
    web: 'Website', privacidad: 'Privacy',
    contacto: 'Contact',
    contactoText: 'For any enquiry about the company or its products:',
    besteedPriv: 'https://besteed.com/privacy/', besteedWeb: 'https://besteed.com/', silncyWeb: 'https://silncy.com/',
    iosHl: 'us', playHl: 'en',
    legal: {
      title: 'Legal notice, privacy and cookies',
      h1: 'Legal notice',
      intro: 'In accordance with article 10 of Spanish Law 34/2002 on information society services and e-commerce (LSSI-CE), the owner of this website is:',
      rows: [
        ['Company', EMPRESA.nom],
        ['Tax ID (NIF)', EMPRESA.nif],
        ['Registered office', EMPRESA.domicili + ', Spain'],
        ['Email', EMPRESA.email],
        ['Registration', `Barcelona Companies Register, sheet ${EMPRESA.full}, 1st entry`],
      ],
      uso: ['Use of this site', 'This site is for information only. The texts, logos and trademarks shown belong to Double Q Works, S.L.U. or to their respective owners and may not be reproduced without permission. Links to third-party sites (App Store, Google Play, Amazon) are provided for convenience; Double Q Works is not responsible for their content.'],
      privTitle: 'Privacy policy',
      priv: [
        'This website has no forms, requires no registration and collects no personal data.',
        'The hosting provider (GitHub Pages, by GitHub, Inc.) may log visitors\' IP addresses for technical and security purposes, under its own privacy policy.',
        `If you email us at ${EMPRESA.email}, the data controller is Double Q Works, S.L.U. We will use your data only to reply, on the basis of the consent you give by writing to us, and keep it for as long as needed to handle your enquiry and any resulting legal obligations. We will not share it with third parties unless required by law.`,
        `You may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${EMPRESA.email}. If you feel they have not been respected, you may complain to the Spanish Data Protection Agency (aepd.es).`,
        'Each app has its own privacy policy, linked from its product entry:',
      ],
      cookiesTitle: 'Cookies',
      cookies: 'This site uses no cookies and no analytics or advertising tools. That is why it shows no cookie banner.',
      updated: 'Last updated',
    },
    notFound: ['Page not found', 'Back to home'],
  },
};

const LANGS = ['es', 'ca', 'en'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(t, { title, description, path, alternates }) {
  const alt = alternates
    ? LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${alternates[l]}">`).join('\n    ') +
      `\n    <link rel="alternate" hreflang="x-default" href="${SITE}${alternates.es}">`
    : '';
  return `<!doctype html>
<html lang="${t.htmlLang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${SITE}${path}">
    ${alt}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <meta name="theme-color" content="#0F5E63">
    <link rel="stylesheet" href="/styles.css">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${SITE}${path}">
    <meta property="og:type" content="website">
  </head>`;
}

// Logo QQ. (Unbounded ExtraBold convertida a traços). Les Q agafen el color del text (--accent); el punt, --dot.
const LOGO = `<svg class="mark" viewBox="0 0 431 189" aria-hidden="true"><g transform="translate(5.20 165.40)"><path fill="currentColor" d="M72.0 -62.400000000000006H116.80000000000001L181.60000000000002 11.8H135.6ZM97.0 3.4000000000000004Q70.0 3.4000000000000004 49.7 -6.3999999999999995Q29.400000000000002 -16.2 18.1 -33.800000000000004Q6.800000000000001 -51.400000000000006 6.800000000000001 -75.0Q6.800000000000001 -98.60000000000001 18.1 -116.20000000000002Q29.400000000000002 -133.8 49.7 -143.60000000000002Q70.0 -153.4 97.0 -153.4Q124.0 -153.4 144.3 -143.60000000000002Q164.60000000000002 -133.8 175.90000000000003 -116.20000000000002Q187.20000000000002 -98.60000000000001 187.20000000000002 -75.0Q187.20000000000002 -51.400000000000006 175.90000000000003 -33.800000000000004Q164.60000000000002 -16.2 144.3 -6.3999999999999995Q124.0 3.4000000000000004 97.0 3.4000000000000004ZM97.0 -38.0Q110.4 -38.0 120.10000000000001 -42.5Q129.8 -47.0 135.0 -55.3Q140.20000000000002 -63.6 140.20000000000002 -75.0Q140.20000000000002 -86.4 135.0 -94.7Q129.8 -103.0 120.10000000000001 -107.5Q110.4 -112.0 97.0 -112.0Q83.60000000000001 -112.0 73.9 -107.5Q64.2 -103.0 59.0 -94.7Q53.800000000000004 -86.4 53.800000000000004 -75.0Q53.800000000000004 -63.6 59.0 -55.3Q64.2 -47.0 73.9 -42.5Q83.60000000000001 -38.0 97.0 -38.0Z"/><path fill="currentColor" d="M253.0421052631579 -62.400000000000006H297.8421052631579L362.64210526315793 11.8H316.6421052631579ZM278.0421052631579 3.4000000000000004Q251.0421052631579 3.4000000000000004 230.7421052631579 -6.3999999999999995Q210.4421052631579 -16.2 199.14210526315793 -33.800000000000004Q187.84210526315792 -51.400000000000006 187.84210526315792 -75.0Q187.84210526315792 -98.60000000000001 199.14210526315793 -116.20000000000002Q210.4421052631579 -133.8 230.7421052631579 -143.60000000000002Q251.0421052631579 -153.4 278.0421052631579 -153.4Q305.0421052631579 -153.4 325.3421052631579 -143.60000000000002Q345.64210526315793 -133.8 356.94210526315794 -116.20000000000002Q368.2421052631579 -98.60000000000001 368.2421052631579 -75.0Q368.2421052631579 -51.400000000000006 356.94210526315794 -33.800000000000004Q345.64210526315793 -16.2 325.3421052631579 -6.3999999999999995Q305.0421052631579 3.4000000000000004 278.0421052631579 3.4000000000000004ZM278.0421052631579 -38.0Q291.44210526315794 -38.0 301.14210526315793 -42.5Q310.8421052631579 -47.0 316.0421052631579 -55.3Q321.2421052631579 -63.6 321.2421052631579 -75.0Q321.2421052631579 -86.4 316.0421052631579 -94.7Q310.8421052631579 -103.0 301.14210526315793 -107.5Q291.44210526315794 -112.0 278.0421052631579 -112.0Q264.64210526315793 -112.0 254.9421052631579 -107.5Q245.2421052631579 -103.0 240.0421052631579 -94.7Q234.84210526315792 -86.4 234.84210526315792 -75.0Q234.84210526315792 -63.6 240.0421052631579 -55.3Q245.2421052631579 -47.0 254.9421052631579 -42.5Q264.64210526315793 -38.0 278.0421052631579 -38.0Z"/><path class="dot" d="M388.6842105263158 2.2Q381.6842105263158 2.2 375.88421052631577 -1.1Q370.0842105263158 -4.4 366.7842105263158 -10.2Q363.4842105263158 -16.0 363.4842105263158 -23.0Q363.4842105263158 -30.200000000000003 366.7842105263158 -35.900000000000006Q370.0842105263158 -41.6 375.88421052631577 -44.900000000000006Q381.6842105263158 -48.2 388.6842105263158 -48.2Q395.8842105263158 -48.2 401.5842105263158 -44.900000000000006Q407.2842105263158 -41.6 410.5842105263158 -35.900000000000006Q413.8842105263158 -30.200000000000003 413.8842105263158 -23.0Q413.8842105263158 -16.0 410.5842105263158 -10.2Q407.2842105263158 -4.4 401.5842105263158 -1.1Q395.8842105263158 2.2 388.6842105263158 2.2Z"/></g></svg>`;

function header(t, lang, alternates) {
  const langLinks = LANGS.map((l) =>
    l === lang
      ? `<span aria-current="true">${l.toUpperCase()}</span>`
      : `<a href="${alternates[l]}" hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`
  ).join('');
  return `
  <header class="top">
    <div class="wrap bar">
      <a class="brand" href="${t.prefix}" aria-label="Double Q Works">${LOGO}<span>Double Q Works</span></a>
      <nav class="langs" aria-label="Language">${langLinks}</nav>
    </div>
  </header>`;
}

function footer(t) {
  return `
  <footer class="foot">
    <div class="wrap">
      <p><strong>${EMPRESA.nom}</strong> · NIF ${EMPRESA.nif} · ${EMPRESA.domicili}</p>
      <p><a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a> · <a href="${t.legalPath}">${t.nav.legal}</a></p>
    </div>
  </footer>`;
}

const homeAlternates = { es: '/', ca: '/ca/', en: '/en/' };
const legalAlternates = { es: '/aviso-legal/', ca: '/ca/avis-legal/', en: '/en/legal/' };

function home(lang) {
  const t = L[lang];
  const ios = BESTEED_IOS.replace('apps.apple.com/', `apps.apple.com/${t.iosHl}/`);
  const play = `${BESTEED_PLAY}&hl=${t.playHl}`;
  return `${head(t, { title: t.title, description: t.description, path: t.prefix, alternates: homeAlternates })}
  <body>
${header(t, lang, homeAlternates)}
  <main>
    <section class="hero wrap">
      <h1>${t.hero}</h1>
      <p class="lede">${t.heroSub}</p>
    </section>

    <section class="wrap" id="products" aria-labelledby="h-products">
      <h2 id="h-products">${t.productos}</h2>
      <ul class="cards">
${BESTEED_PUBLICADA ? `
        <li class="card">
          <div class="card-head"><h3>besteed</h3><span class="tag ok">${t.disponible}</span></div>
          <p>${t.besteed}</p>
          <p class="links">
            <a href="${ios}">App Store</a>
            <a href="${play}">Google Play</a>
            <a href="${t.besteedWeb}">${t.web}</a>
            <a href="${t.besteedPriv}">${t.privacidad}</a>
          </p>
        </li>
` : ''}        <li class="card">
          <div class="card-head"><h3>Silncy</h3><span class="tag">${t.enDesarrollo}</span></div>
          <p>${t.silncy}</p>
          <p class="links"><a href="${t.silncyWeb}">${t.web}</a></p>
        </li>
        <li class="card">
          <div class="card-head"><h3>Smile Items</h3></div>
          <p>${t.smile}</p>
        </li>
      </ul>
    </section>

    <section class="wrap contact" id="contact" aria-labelledby="h-contact">
      <h2 id="h-contact">${t.contacto}</h2>
      <p>${t.contactoText} <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></p>
    </section>
  </main>
${footer(t)}
  </body>
</html>
`;
}

function legal(lang) {
  const t = L[lang];
  const g = t.legal;
  return `${head(t, { title: `${g.title} — Double Q Works`, description: g.intro.slice(0, 150), path: t.legalPath, alternates: legalAlternates })}
  <body>
${header(t, lang, legalAlternates)}
  <main class="wrap prose">
    <h1>${g.h1}</h1>
    <p>${g.intro}</p>
    <dl class="facts">
      ${g.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${k.includes('orreo') || k.includes('orreu') || k === 'Email' ? `<a href="mailto:${v}">${v}</a>` : esc(v)}</dd></div>`).join('\n      ')}
    </dl>
    <h2>${g.uso[0]}</h2>
    <p>${g.uso[1]}</p>

    <h2 id="privacy">${g.privTitle}</h2>
    ${(BESTEED_PUBLICADA ? g.priv : g.priv.slice(0, -1)).map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    ${BESTEED_PUBLICADA ? `<ul>
      <li>besteed: <a href="${t.besteedPriv}">${t.besteedPriv.replace('https://', '')}</a></li>
    </ul>` : ''}

    <h2 id="cookies">${g.cookiesTitle}</h2>
    <p>${g.cookies}</p>

    <p class="muted">${g.updated}: ${UPDATED}</p>
  </main>
${footer(t)}
  </body>
</html>
`;
}

function notFound() {
  const t = L.es;
  return `${head(t, { title: '404 — Double Q Works', description: t.description, path: '/404.html' })}
  <body>
${header(t, 'es', homeAlternates)}
  <main class="wrap hero">
    <h1>404</h1>
    <p class="lede">${L.es.notFound[0]} · ${L.ca.notFound[0]} · ${L.en.notFound[0]}</p>
    <p><a href="/">${L.es.notFound[1]}</a> · <a href="/ca/">${L.ca.notFound[1]}</a> · <a href="/en/">${L.en.notFound[1]}</a></p>
  </main>
${footer(t)}
  </body>
</html>
`;
}

function out(path, content) {
  const file = '.' + (path.endsWith('/') ? path + 'index.html' : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('  ' + file);
}

for (const lang of LANGS) {
  out(homeAlternates[lang], home(lang));
  out(legalAlternates[lang], legal(lang));
}
out('/404.html', notFound());
out('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...Object.values(homeAlternates), ...Object.values(legalAlternates)].map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}
</urlset>
`);
out('/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
out('/CNAME', 'doubleqworks.com\n');
out('/.nojekyll', '');
console.log('Fet.');
