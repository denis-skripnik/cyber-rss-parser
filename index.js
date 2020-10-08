const my_rss = require('./my_rss.js');
const conf = require('./config.json');
const Ipfs = require('ipfs')
const cyber = require('./cyber');
const lf = require('./linksfile');
const { add } = require('ipfs/src/core/components');

let node
lf.pathFile('./links.json')

my_rss.on('item', async function(item) {
        const fileAdded = await node.add({
        path: item.title,
        content: item.content
    })
    const keywordAdded = await node.add({
        path: 'keyword' + parseInt(new Date().getTime()),
        content: item.title
    })
lf.addItem([String(fileAdded.cid), String(keywordAdded.cid)]);
})
my_rss.on('error', function(error) {
    console.error('my_rss error', error);
})

async function createTransactions() {
    let link = lf.getItem();
if (link) {
    let res = await cyber.link(link[0], link[1]);
console.log(JSON.stringify(res));
}

}

async function runReader() {
    // к примеру при загрузке приложения передавать список rss лент для чтения
    // модуль прочитает каждую ленту по очереди и передаст событие с каждой записбю из ленты
    my_rss.reader(conf.rss_links);

    setInterval(createTransactions, 10000);
}

async function main() {
    node = await Ipfs.create()
}
runReader();
setInterval(runReader, 360000);
main();