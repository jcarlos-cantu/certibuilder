import { useState, useRef } from 'react';

export default function DropZone({ onImageLoad }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setLoading(true);
    setPreview(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setLoading(false);
      onImageLoad(file);
    };
    reader.onerror = () => {
      setLoading(false);
      alert('Error al cargar la imagen');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
        <h2 className="text-xl font-semibold">Subí tu plantilla</h2>
      </div>

      <div
        className={`drop-zone border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition relative ${
          isDragOver ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
        />

        {!preview && !loading && (
          <div id="upload-prompt">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-500"></i>
            </div>
            <p className="text-lg font-medium mb-2">Arrastrá la imagen acá</p>
            <p className="text-gray-500 mb-4">o usá el botón de abajo</p>
            <label className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition inline-flex items-center gap-2 cursor-pointer">
              <i className="fa-solid fa-folder-open"></i>Seleccionar imagen
            </label>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/95 rounded-2xl">
            <div className="w-16 h-16 mb-4 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-lg font-medium">Procesando...</p>
          </div>
        )}

        {preview && (
          <div id="preview-container">
            <img src={preview} alt="Preview" className="max-w-md rounded-xl shadow-2xl mx-auto" />
            <p className="text-gray-500 text-sm mt-4">¡Imagen cargada! Ya podés usar el paso 2.</p>
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="mt-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm inline-flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-right"></i>Cambiar imagen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}