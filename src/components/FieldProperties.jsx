export default function FieldProperties({ field, onUpdate, onDelete }) {
  if (!field) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Propiedades</h3>
        <p className="text-gray-500 text-sm">Seleccioná un campo para ver sus propiedades</p>
      </div>
    );
  }

  const typeLabels = { name: 'Nombre', photo: 'Foto', category: 'Categoría' };

  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Propiedades</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tipo</label>
          <span className="px-3 py-2 bg-gray-800 rounded-lg text-white block">
            {typeLabels[field.type]}
          </span>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Ancho: <span className="text-white font-mono">{field.w}px</span>
          </label>
          <input
            type="range"
            min="20"
            max="1200"
            value={field.w}
            onChange={(e) => onUpdate(field.id, { w: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Alto: <span className="text-white font-mono">{field.h}px</span>
          </label>
          <input
            type="range"
            min="20"
            max="600"
            value={field.h}
            onChange={(e) => onUpdate(field.id, { h: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {field.type !== 'photo' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Color texto</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={field.color}
                  onChange={(e) => onUpdate(field.id, { color: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={field.color}
                  onChange={(e) => onUpdate(field.id, { color: e.target.value })}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Fuente</label>
              <select
                value={field.font}
                onChange={(e) => onUpdate(field.id, { font: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="system-ui">System UI</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Impact">Impact</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Tamaño: <span className="text-white font-mono">{field.fontsize}px</span>
              </label>
              <input
                type="range"
                min="8"
                max="72"
                value={field.fontsize}
                onChange={(e) => onUpdate(field.id, { fontsize: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        )}

        <button
          onClick={() => onDelete(field.id)}
          className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition"
        >
          <i className="fa-solid fa-trash mr-2"></i>Eliminar campo
        </button>
      </div>
    </div>
  );
}