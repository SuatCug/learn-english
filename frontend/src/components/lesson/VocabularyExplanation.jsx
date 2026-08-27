// Vocabulary konuları için "Explanation" görünümü — resim kullanılmıyor, sadece emoji.
// Kelime grupları tablo halinde: (varsa) emoji, kelime, anlam/örnek cümle.
function WordTable({ group, theme }) {
  const hasEmoji = group.words.some((w) => w.emoji);

  return (
    <div className={`rounded-xl border ${theme.borderLighter} overflow-hidden`}>
      {group.heading && (
        <p className={`px-4 py-2.5 text-base font-bold text-gray-900 ${theme.lightBg}`}>{group.heading}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`${theme.solid} text-white`}>
              {hasEmoji && <th className="text-left font-semibold px-3 py-2 w-12"></th>}
              <th className="text-left font-semibold px-3 py-2 whitespace-nowrap">Word</th>
              <th className="text-left font-semibold px-3 py-2">Meaning &amp; Example</th>
            </tr>
          </thead>
          <tbody>
            {group.words.map((w, i) => (
              <tr key={w.word} className={i % 2 === 1 ? theme.subtleBg : 'bg-white'}>
                {hasEmoji && <td className="px-3 py-2.5 text-lg align-top">{w.emoji ?? ''}</td>}
                <td className="px-3 py-2.5 font-bold text-gray-900 align-top whitespace-nowrap">{w.word}</td>
                <td className="px-3 py-2.5 text-gray-700 align-top">
                  <span>{w.meaning}</span>
                  {w.example && <span className="block text-gray-500 italic mt-0.5">{w.example}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function VocabularyExplanation({ data, theme, onNext }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1.5">{data.heading}</h2>
      <p className="text-base text-gray-700 mb-6">{data.intro}</p>

      <div className="space-y-6 mb-6">
        {data.groups.map((group, i) => (
          <WordTable key={group.heading ?? i} group={group} theme={theme} />
        ))}
      </div>

      {data.tips && (
        <div className={`rounded-xl border-2 ${theme.border} bg-white p-4 mb-8`}>
          <p className="font-bold text-gray-900 mb-1.5">Tips</p>
          <ul className="text-sm text-gray-700 space-y-1">
            {data.tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className={theme.text}>✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {onNext && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className={`rounded-full ${theme.solid} ${theme.solidHover} text-white font-semibold px-6 py-3 text-sm transition-colors`}
          >
            Next: Try the Exercises →
          </button>
        </div>
      )}
    </div>
  );
}
