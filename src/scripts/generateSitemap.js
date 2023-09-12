const fs = require('fs');
const globby = require('globby');

const addPage = (page) => {
  // remove unneeded segments of the page file path - for example: 'src/app/home/page.tsx' becomes '/home'
  const pathname = page.replace('src/app', '').replace('/page.tsx', '');

  // insert extra logic here to handle specific pages differently if needed
  // for example - fetching dynamic page names from a database or ignoring specific pages
  // ........

  return `<url>
    <loc>${`${process.env.WEBSITE_URL}${pathname}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    </url>`;
};

const generateSitemap = async () => {
  // get all page paths in the app router
  const pages = await globby(['src/app/**/page.tsx']);

  // generate sitemap XML
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join('\n')}
  </urlset>`;

  // write sitemap file to public folder - will be available at root url - for example: https://example.com/sitemap.xml
  fs.writeFileSync('public/sitemap.xml', sitemap);
};

generateSitemap();
