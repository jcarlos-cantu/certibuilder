import { useState, useRef, useEffect } from 'react';

export default function ExportPanel({ fields, image, onBack }) {
  const [fieldValues, setFieldValues] = useState(
    Object.fromEntries(fields.map(f => [f.id, f.type === 'photo' ? null : '']))
  );
  const [exporting, setExporting] = useState(false);
  const imgRef = useRef(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!imgRef.current) return;
    const update = () => setImgSize({ w: imgRef.current.offsetWidth, h: imgRef.current.offsetHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [image]);

  const handleExport = async (format = 'png') => {
    if (!imgRef.current || imgSize.w === 0) return;
    setExporting(true);
    try {
      const origW = imgRef.current.naturalWidth;
      const origH = imgRef.current.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width = origW;
      canvas.height = origH;
      const ctx = canvas.getContext('2d');

      const freshImg = new Image();
      freshImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        freshImg.onload = resolve;
        freshImg.onerror = reject;
        freshImg.src = image;
      });
      ctx.drawImage(freshImg, 0, 0, origW, origH);

      for (const f of fields) {
        const ox = f.x;
        const oy = f.y;
        const ow = f.w;
        const oh = f.h;

        if (f.type === 'photo' && fieldValues[f.id]) {
          const pImg = new Image();
          await new Promise(r => { pImg.onload = r; pImg.onerror = r; pImg.src = fieldValues[f.id]; });
          const pAspect = pImg.naturalWidth / pImg.naturalHeight;
          const boxAspect = ow / oh;
          let sx, sy, sw, sh;
          if (pAspect > boxAspect) {
            sh = pImg.naturalHeight;
            sw = sh * boxAspect;
            sy = 0;
            sx = (pImg.naturalWidth - sw) / 2;
          } else {
            sw = pImg.naturalWidth;
            sh = sw / boxAspect;
            sx = 0;
            sy = (pImg.naturalHeight - sh) / 2;
          }
          ctx.save();
          ctx.beginPath();
          ctx.rect(ox, oy, ow, oh);
          ctx.clip();
          ctx.drawImage(pImg, sx, sy, sw, sh, ox, oy, ow, oh);
          ctx.restore();
        } else if (f.type !== 'photo') {
          const text = fieldValues[f.id] || (f.type === 'name' ? 'Nombre' : 'Categoría');
          ctx.fillStyle = f.color;
          ctx.font = `${f.fontsize}px ${f.font}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, ox + ow / 2, oy + oh / 2);
        }
      }

      const link = document.createElement('a');
      link.download = `certificado.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, 0.95);
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting(false);
  };

  const origW = imgRef.current?.naturalWidth || 1;
  const origH = imgRef.current?.naturalHeight || 1;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
        <h2 className="text-xl font-semibold">Completá y exportá</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Fill fields */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Datos del certificado</h3>
            <div className="space-y-4">
              {fields.filter(f => f.type !== 'photo').map(f => (
                <div key={f.id}>
                  <label className="block text-sm text-gray-400 mb-1">
                    {f.type === 'name' ? 'Nombre' : 'Categoría'}
                  </label>
                  <input
                    type="text"
                    value={fieldValues[f.id] || ''}
                    onChange={e => setFieldValues(prev => ({ ...prev, [f.id]: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              ))}
              {fields.filter(f => f.type === 'photo').map(f => (
                <div key={f.id}>
                  <label className="block text-sm text-gray-400 mb-1">Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => setFieldValues(prev => ({ ...prev, [f.id]: ev.target.result }));
                      reader.readAsDataURL(file);
                    }}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
                  />
                  {fieldValues[f.id] && (
                    <img src={fieldValues[f.id]} alt="Preview" className="mt-2 h-20 rounded object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleExport('png')}
              disabled={exporting || imgSize.w === 0}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded-xl font-bold text-lg transition"
            >
              {exporting ? 'Exportando...' : <><i className="fa-solid fa-download mr-2"></i>PNG</>}
            </button>
            <button
              onClick={() => handleExport('jpg')}
              disabled={exporting || imgSize.w === 0}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-bold text-lg transition"
            >
              {exporting ? 'Exportando...' : <><i className="fa-solid fa-download mr-2"></i>JPG</>}
            </button>
          </div>

          <button
            onClick={onBack}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>Volver al editor
          </button>
        </div>

        {/* Right: Live preview */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Vista previa</h3>
          <div className="overflow-auto max-h-[70vh] flex justify-center">
            <div className="relative">
              <img
                ref={imgRef}
                src={image}
                alt="Certificado"
                className="block max-w-full h-auto"
              />
              {fields.map(f => (
                <div
                  key={f.id}
                  className="absolute"
                  style={{
                    left: origW > 1 ? `${(f.x / origW) * 100}%` : '0%',
                    top: origH > 1 ? `${(f.y / origH) * 100}%` : '0%',
                    width: origW > 1 ? `${(f.w / origW) * 100}%` : '0%',
                    height: origH > 1 ? `${(f.h / origH) * 100}%` : '0%',
                    color: f.color, fontFamily: f.font, fontSize: `${f.fontsize}px`,
                  }}
                >
                  {f.type === 'photo' ? (
                    fieldValues[f.id] ? (
                      <img src={fieldValues[f.id]} alt="" className="w-full h-full object-cover" style={{ borderRadius: 4 }} />
                    ) : (
                      <div className="w-full h-full bg-gray-700/50 rounded flex items-center justify-center">
                        <i className="fa-solid fa-camera text-gray-400 text-xl"></i>
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center">
                      {fieldValues[f.id] || (f.type === 'name' ? 'Nombre' : 'Categoría')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
