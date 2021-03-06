import { useState } from 'react';
import chaptersByLetter from './chaptersByLetter.json'

type hebrewLetter = 'א' | 'ב' | 'ג' | 'ד' | 'ה' | 'ו' | 'ז' | 'ח' | 'ט' | 'י' | 'כ' | 'ל' | 'מ' | 'נ' | 'ס' | 'ע' | 'פ' | 'צ' | 'ק' | 'ר' | 'ש' | 'ת'

function toNonEndingCase(char: string) {
  return { 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ך': 'כ', 'ץ': 'צ' }[char] || char;
}


function App() {
  const [name, setName] = useState('');

  return (
    <div className="m-0">
      <header className="m-4 text-3xl">
        Yahrzeit Mishnayos
      </header>

      <input
        className='m-4 mx-auto block text-3xl border-2 border-gray-600 w-5/6'
        dir="rtl"
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {name.split('').map(letter => {
        const normilizedLetter = toNonEndingCase(letter);
        const chapters = chaptersByLetter[normilizedLetter as hebrewLetter];
        if (!chapters) { return null; }
        let mesechtaTitle = ""
        let sameMesechta = false
        return (
          <div className="m-4" key={letter} dir="rtl">
            <h2 className="text-5xl">{letter}</h2>
            <ul className="list-disc list-inside">
              {
                chapters.map(chapter => {
                  sameMesechta = mesechtaTitle === chapter.mesechta
                  mesechtaTitle = chapter.mesechta
                  return (
                    <a
                      href={`https://www.sefaria.org/${chapter.ref}`}
                      className={`text-lime-700 py-1 ${sameMesechta ? 'pr-0' : 'pr-2'}`}
                      target="_blank" rel="noreferrer"
                    >
                      {sameMesechta ? ", " + chapter.chapter : chapter.title}
                    </a>
                  )
                })}
            </ul>
          </div>

        )
      })}


    </div>
  );
}

export default App;
