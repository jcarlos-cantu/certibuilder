import { useState, useRef, useEffect } from 'react';
import FieldMarker from './FieldMarker';
import FieldProperties from './FieldProperties';

export default function FieldEditor({
  image,
  naturalWidth,
  naturalHeight,
  fields,
  selectedField,
  zoom,
  onAddField,
  onUpdateField,
  onDeleteField,
  onSelectField,
  onZoomChange,
  onPreview,
  onNextStep,
}) {
  const [selectedType, setSelectedType] = useState('name');
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [renderedDims, setRenderedDims] = useState({ w: 0, h: 0 });
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (imgRef.current) {
      const update = () => {
        setRenderedDims({
          w: imgRef.current.offsetWidth,
          h: imgRef.current.offsetHeight,
        });
      };
      update();
    }
  }, [image]);

  const scaleX = renderedDims.w / naturalWidth;
  const scaleY = renderedDims.h / naturalHeight;

  const handleCanvasClick = (e) => {
    if (e.target !== imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scaleX;
    const y = (e.clientY - rect.top) / scaleY;
    onAddField(Math.round(x), Math.round(y), selectedType);
  };

  const handleMarkerMouseDown = (e, field) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startFieldX = field.x;
    const startFieldY = field.y;

    const onMove = (me) => {
      const dx = (me.clientX - startMouseX) / scaleX;
      const dy = (me.clientY - startMouseY) / scaleY;
      const newX = Math.max(0, Math.min(naturalWidth - field.w, Math.round(startFieldX + dx)));
      const newY = Math.max(0, Math.min(naturalHeight - field.h, Math.round(startFieldY + dy)));
      onUpdateField(field.id, { x: newX, y: newY });
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const typeBtns = [
    { type: 'name', icon: 'fa-pen', label: 'Nombre', color: 'bg-blue-600 ring-blue-500' },
    { type: 'photo', icon: 'fa-camera', label: 'Foto', color: 'bg-green-600 hover:bg-green-500' },
    { type: 'category', icon: 'fa-trophy', label: 'Categoría', color: 'bg-purple-600 hover:bg-purple-500' },
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
        <h2 className="text-xl font-semibold">Agregá campos interactivos</h2>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <p className="text-gray-400 text-sm mb-4">Seleccioná tipo y hacé clic en la imagen para posicionar</p>
            <div className="flex flex-wrap gap-3">
              {typeBtns.map(({ type, icon, label, color }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-5 py-3 rounded-xl font-medium transition ${color} ${
                    selectedType === type ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-white' : ''
                  }`}
                >
                  <i className={`fa-solid ${icon} mr-2`}></i>{label}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-gray-800 flex items-center gap-4">
              <span className="text-gray-400 text-sm">Zoom</span>
              <input
                type="range"
                min="25"
                max="200"
                value={zoom}
                onChange={(e) => onZoomChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-white font-mono text-sm w-12 text-right">{zoom}%</span>
            </div>

            {fields.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={onNextStep}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition"
                >
                  <i className="fa-solid fa-arrow-right mr-2"></i>Generar certificado
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 overflow-auto">
            <div
              ref={containerRef}
              className="relative inline-block"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
            >
              <img
                ref={imgRef}
                src={image}
                alt="Template"
                className="max-w-full h-auto block"
                style={{ width: 'auto', height: 'auto', maxHeight: '70vh' }}
                onClick={handleCanvasClick}
              />
              <div className="absolute" style={{ top: 0, left: 0, pointerEvents: 'none' }}>
                {fields.map((field) => (
                  <FieldMarker
                    key={field.id}
                    field={field}
                    isSelected={selectedField?.id === field.id}
                    scaleX={renderedDims.w / naturalWidth}
                    scaleY={renderedDims.h / naturalHeight}
                    onMouseDown={(e) => handleMarkerMouseDown(e, field)}
                    onClick={(e) => { e.stopPropagation(); onSelectField(field.id); }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <FieldProperties
          field={selectedField}
          onUpdate={onUpdateField}
          onDelete={onDeleteField}
        />
      </div>
    </section>
  );
}