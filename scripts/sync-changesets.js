/* eslint-disable */

const fs = require('node:fs')

const branch = process.argv[2] ?? 'main'

async function getFiles() {
    const githubUrl = `https://api.github.com/repos/navikt/sykmelder-statistikk-kafka/contents/src/main/resources/db?ref=${branch}`
    console.info(`Fetching changesets from sykmelder-statistikk-kafka on ${branch} branch...`)
    console.info(githubUrl)

    const result = await fetch(githubUrl, {
        method: 'GET',
    }).then((it) => it.json())

    if (result.message === 'Not Found') {
        console.error('!!! Github says not found. Correct branch? !!!')
        process.exit(1)
    }

    return result.map((it) => it.download_url)
}

async function downloadFile(url) {
    const result = await fetch(url, {
        method: 'GET',
    }).then((it) => it.text())

    const fileName = url.split('/').pop()
    fs.writeFileSync(`./src/db/dev/changesets/${fileName}`, result)
    return fileName
}

getFiles().then((it) => it.forEach((it) => downloadFile(it).then((it) => console.info(`Downloaded and saved ${it}`))))
