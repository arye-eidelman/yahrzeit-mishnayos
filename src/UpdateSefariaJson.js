// run this script to generate the chapterByLetter.json file

function htmlToText(html) {
  const div = document.createElement("div")
  div.innerHTML = html
  return div.textContent || div.innerText || ""
}

async function getMesechtos() {
  const categories = await fetch('https://www.sefaria.org/api/index').then(r => r.json())
  const mishnayos = categories[1].contents.slice(0, 6)

  return mishnayos.map((seder) =>
    seder.contents.map((mesechta) => ({
      title: mesechta.title,
      heTitle: mesechta.heTitle,
      order: mesechta.order,
    }))
  ).flat()
}

async function getChaptersgroupedByLetter() {
  let byLetter = { א: [], ב: [], ג: [], ד: [], ה: [], ו: [], ז: [], ח: [], ט: [], י: [], כ: [], ל: [], מ: [], נ: [], ס: [], ע: [], פ: [], צ: [], ק: [], ר: [], ש: [], ת: [] }
  const mesechtos = await getMesechtos()
  for (const mesechta of mesechtos.splice(0)) {
    for (let i = 1; i < 25; i++) {
      const chapter = await fetch(`https://www.sefaria.org/api/texts/${mesechta.title.replaceAll(' ', '_')}.${i}?lang=he`, {
        cache: "force-cache"
      })
        .then(r => r.json())
      if ((!chapter.error) && byLetter[htmlToText(chapter.he[0])[0]]) {
        byLetter[htmlToText(chapter.he[0])[0]].push({
          title: chapter.heRef.split('משנה ')[1],
          mesechta: mesechta.heTitle.split('משנה ')[1],
          chapter: chapter.heRef.split(' ').reverse()[0],
          contents: chapter.he,
          ref: chapter.ref,
        })
      }
    }
  }
  return byLetter
}

getChaptersgroupedByLetter().then(console.log)
