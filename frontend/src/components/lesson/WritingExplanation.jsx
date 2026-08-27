// Writing konuları için "Explanation" görünümü — yazı türü rozetİ, kısa giriş, adım adım
// paragraf planı, kategorilere ayrılmış kullanışlı ifadeler ve "Writing Tips" kutusu.
function StructureStep({ index, step, theme }) {
  return (
    <div className="flex gap-3">
      <span className={`mt-0.5 shrink-0 w-7 h-7 rounded-full ${theme.solid} text-white text-sm font-bold flex items-center justify-center`}>
        {index + 1}
      </span>
      <div>
        <p className="font-semibold text-gray-900">{step.step}</p>
        <p className="text-sm text-gray-600 mt-0.5">{step.detail}</p>
      </div>
    </div>
  );
}

function LanguageCard({ group, theme }) {
  return (
    <div className={`rounded-xl border ${theme.borderLighter} overflow-hidden`}>
      <p className={`px-4 py-2.5 text-sm font-bold text-gray-900 ${theme.lightBg}`}>{group.heading}</p>
      <ul className="p-4 space-y-2 text-sm text-gray-700">
        {group.phrases.map((phrase) => (
          <li key={phrase} className="flex gap-2">
            <span className={`${theme.text} shrink-0`}>–</span>
            <span className="italic">{phrase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WritingExplanation({ data, theme, onNext }) {
  return (
    <div>
      <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
        <h2 className="text-xl font-bold text-gray-900 break-words min-w-0">{data.heading}</h2>
        <span className={`shrink-0 rounded-full ${theme.lightBg} ${theme.text} text-xs font-semibold px-2.5 py-1`}>
          {data.textType}
        </span>
      </div>
      <p className="text-base text-gray-700 mb-6">{data.intro}</p>

      <p className="text-sm font-bold text-gray-900 mb-3">How to Structure It</p>
      <div className="space-y-4 mb-8">
        {data.structure.map((step, i) => (
          <StructureStep key={step.step} index={i} step={step} theme={theme} />
        ))}
      </div>

      <p className="text-sm font-bold text-gray-900 mb-3">Useful Language</p>
      <div className="grid gap-4 mb-8 md:grid-cols-2">
        {data.usefulLanguage.map((group) => (
          <LanguageCard key={group.heading} group={group} theme={theme} />
        ))}
      </div>

      {data.tips && (
        <div className={`rounded-xl border-2 ${theme.border} bg-white p-4 mb-8`}>
          <p className="font-bold text-gray-900 mb-1.5">Writing Tips</p>
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
            Next: Try the Exercise →
          </button>
        </div>
      )}
    </div>
  );
}
