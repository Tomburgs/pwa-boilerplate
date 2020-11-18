const path = require('path');
const { promises: fs, existsSync } = require('fs');
const { toXML } = require('jstoxml');

module.exports = async (getPagesFunctions, options, outputDir) => {
    const list = [];

    for (getPages of getPagesFunctions) {
        const pages = await getPages(options);

        list.push(...pages);
    }

    const sitemap = toXML({
        _name: 'urlset',
        _attrs: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
        _content: list.map(url => ({ url }))
    }, { header: true });

    const doesOutputDirExist = existsSync(outputDir);

    if (!doesOutputDirExist) {
        await fs.mkdir(outputDir, { recursive: true });
    }

    const output = path.resolve(outputDir, 'sitemap.xml');

    await fs.writeFile(output, sitemap);

    console.log('✨ Sitemap generated');
};
