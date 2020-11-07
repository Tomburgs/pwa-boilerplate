const fs = require('fs');
const path = require('path');
const { toXML } = require('jstoxml');

module.exports = async (getPagesFunctions, baseUrl, outputDir) => {
    const list = [];

    for (getPages of getPagesFunctions) {
        const pages = await getPages(baseUrl);

        list.push(...pages);
    }

    const sitemap = toXML({
        _name: 'urlset',
        _attrs: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
        _content: list.map(url => ({ url }))
    }, { header: true });

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const output = path.resolve(outputDir, 'sitemap.xml');

    fs.writeFileSync(output, sitemap);

    console.log('✨ Sitemap generated');
};
