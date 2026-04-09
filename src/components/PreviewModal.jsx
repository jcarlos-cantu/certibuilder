export default function PreviewModal({ image, fields, naturalWidth, naturalHeight, onClose }) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="font-semibold text-lg">Vista Previa</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="inline-block relative" style={{ maxWidth: 500 }}>
            <img src={image} alt="Preview" className="max-w-full rounded shadow-2xl" />
            {fields.map((f) => {
              const colors = {
                name: 'bg-blue-500/60',
                photo: 'bg-green-500/60',
                category: 'bg-purple-500/60',
              };
              return (
                <div
                  key={f.id}
                  className={`absolute ${colors[f.type]} rounded flex items-center justify-center`}
                  style={{
                    left: `${(f.x / naturalWidth) * 100}%`,
                    top: `${(f.y / naturalHeight) * 100}%`,
                    width: `${(f.w / naturalWidth) * 100}%`,
                    height: `${(f.h / naturalHeight) * 100}%`,
                    color: f.color,
                    fontFamily: f.font,
                    fontSize: `${f.fontsize}px`,
                  }}
                >
                  {f.type === 'photo' ? (
                    <i className="fa-solid fa-camera text-white text-2xl"></i>
                  ) : (
                    <span className="text-center w-full truncate px-2">
                      {f.type === 'name' ? 'Nombre' : 'Categoría'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}