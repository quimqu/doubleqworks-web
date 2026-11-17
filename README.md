# doubleqworks.com

Web d'empresa de **Double Q Works, S.L.U.** És estàtica (HTML i CSS), no fa servir cookies ni analítica i està en tres idiomes:

| Pàgina | castellà (per defecte) | català | anglès |
|---|---|---|---|
| Inici | `/` | `/ca/` | `/en/` |
| Avís legal, privacitat i galetes | `/aviso-legal/` | `/ca/avis-legal/` | `/en/legal/` |

Tots els textos són a `build.mjs`. Per canviar-ne algun, l'edites, executes `node build.mjs` per regenerar les pàgines i ho tornes a pujar.

## Publicar-la a GitHub Pages (compte quimqu)

1. A GitHub, crea un repositori **públic** anomenat `doubleqworks-web`. GitHub Pages en un repositori privat requereix un pla de pagament.
2. Puja-hi **tot el contingut d'aquesta carpeta** a l'arrel del repositori, no la carpeta mateixa. Des del web: *Add file → Upload files* i hi arrossegues els fitxers i les carpetes `ca`, `en` i `aviso-legal`.
3. *Settings → Pages*:
   - *Source*: **Deploy from a branch**, branca `main`, carpeta `/ (root)`.
   - *Custom domain*: `doubleqworks.com`. El fitxer `CNAME` ja el porta.
4. Quan el DNS ja resolgui (vegeu el punt següent), marca **Enforce HTTPS**. El certificat pot trigar fins a una hora.

## DNS a Namecheap (Domain List → doubleqworks.com → Manage → Advanced DNS)

Fes primer una captura de la pantalla tal com està.

**Afegeix:**

| Tipus | Host | Valor |
|---|---|---|
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |
| CNAME Record | `www` | `quimqu.github.io.` |

**No toquis** (comprovat el 17/11/2026):

- Els MX `eforward*.registrar-servers.com` i el TXT `v=spf1 include:spf.efwd.registrar-servers.com ~all`: són el reenviament de correu de `sales@` i `seller@`.
- L'A `acces-finnelis` → `80.225.184.130`: és el servidor de Finnelis.

Si hi ha un **URL Redirect Record** a `@`, esborra'l, perquè entra en conflicte amb els registres A.

## Correu info@

L'avís legal publica `info@doubleqworks.com`. Abans de publicar, crea'l a Namecheap: *Domain List → Manage → Redirect Email* (el mateix lloc on hi ha `sales@`), redirigit al correu on vulguis rebre'l.

## Pendent

- **Smile Items** surt sense enllaç. Quan tinguis l'URL de la botiga d'Amazon, afegeix-la a `build.mjs`.
- **Silncy** surt com a «en desenvolupament». Quan sigui a les botigues, hi poses els enllaços i la política de privacitat, com a besteed.
