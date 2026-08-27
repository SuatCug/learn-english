// Grammar konuları için tablo tabanlı "Explanation" görünümü — tablo(lar) + "Key Point"
// kutusu + "Next: Try the Exercises" butonu. Hücre metinlerinde **kalın** işaretlenebilir.
function renderCell(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

function GrammarTable({ table, theme }) {
  return (
    <div className={`rounded-xl border ${theme.borderLighter} overflow-hidden`}>
      {table.heading && (
        <p className={`px-4 py-2.5 text-base font-bold text-gray-900 ${theme.lightBg}`}>{table.heading}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`${theme.solid} text-white`}>
              {table.columns.map((col) => (
                <th key={col} className="text-left font-semibold px-3 py-2 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? theme.subtleBg : 'bg-white'}>
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5 text-gray-800 align-top">
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GrammarExplanation({ data, theme, onNext }) {
  const intros = Array.isArray(data.intro) ? data.intro : [data.intro];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1.5">{data.heading}</h2>
      {intros.map((p) => (
        <p key={p} className="text-base text-gray-700 mb-3">
          {renderCell(p)}
        </p>
      ))}

      <div className={`grid gap-6 mt-3 mb-6 ${data.tables.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {data.tables.map((table, i) => (
          <GrammarTable key={table.heading ?? i} table={table} theme={theme} />
        ))}
      </div>

      {data.notes && (
        <div className="text-sm text-gray-700 space-y-1.5 mb-6">
          {data.notes.map((note) => (
            <p key={note}>{renderCell(note)}</p>
          ))}
        </div>
      )}

      {data.keyPoint && (
        <div className={`rounded-xl border-2 ${theme.border} bg-white p-4 mb-8`}>
          <p className="font-bold text-gray-900 mb-1.5">{data.keyPoint.title}</p>
          <div className="text-sm text-gray-700 space-y-0.5">
            {data.keyPoint.lines.map((line) => (
              <p key={line}>{renderCell(line)}</p>
            ))}
          </div>
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
