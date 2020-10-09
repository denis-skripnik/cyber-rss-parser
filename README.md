# cyber-rss-parser
 Rss parser for Cyber links

## install
1. Download this repo:
git clone https://github.com/denis-skripnik/cyber-rss-parser
2. Go to the project directory;
And check the permissions for the links file.json and change them to 0777 if they differ from the specified one;
3. Before installing send commands for ipfs npm package:
npm install -g node-gyp
3.1. If your Os is Linux Ubuntu or other:
sudo apt-get install python3 -y
sudo apt-get install python3-dev python3-pip
sudo apt-get install python-dev python-pip -y
sudo pip3 install ast
sudo pip install ast
3.2. If you are in Windows, install windows-build-tools:
npm install --global --production windows-build-tools
4. Send command (In windows, open windows Powershell or command line in administration mode, In linux send command with sudo):
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
node cyber_rss.js
2. If pm2 is installed:
pm2 start cyber_rss.js

## That is all
Thanks and we will be glad to receive pull requests.

## Author
Blind developer Denis Skripnik: https://denis-skripnik.name
Cyber address for donates:
**cyber16yf94eecl6h44l5w7zp75skh3rg0k4vee549dh**