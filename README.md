# cyber-rss-parser
 Rss parser for Cyber links

## install
1. Download this repo:
git clone https://github.com/denis-skripnik/cyber-rss-parser
2. Go to the project directory;
3. Install node-gyp for ipfs:
npm install -g node-gyp
4. If you are in Windows, install windows-build-tools:
npm install --global --production windows-build-tools
5. Send command (In windows, open windows Powershell or command line in administration mode):
npm install

## Configuration
Open config.json and change data:
- Add rss links (only the rss xml format, and with full data). For example:
``"rss_links": ["site.com/rss", "articles.site/feed"],``;
- Change cyber_node if required.
- add your seed frase. For example:
``"seed": "one two three fore five number tree data words maximum buy document dog best home darc house dance disc sort second prime true vesting"``

## run
1. If not install pm2:
node index.js
2. If pm2 is installed:
pm2 start index.js

## That is all
Thanks and we will be glad to receive pull requests.