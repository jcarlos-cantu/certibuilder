import { useState } from 'react';
import { useCertificateBuilder } from './hooks/useCertificateBuilder';
import DropZone from './components/DropZone';
import FieldEditor from './components/FieldEditor';
import ExportPanel from './components/ExportPanel';
import PreviewModal from './components/PreviewModal';

export default function App() {
  const builder = useCertificateBuilder();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-certificate text-white"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold">Certificado Builder</h1>
              <p className="text-gray-500 text-sm">Crea plantillas interactivas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {builder.step > 1 && (
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition"
              >
                <i className="fa-solid fa-eye mr-2"></i>Vista Previa
              </button>
            )}
            {builder.step > 1 && (
              <button
                onClick={builder.goBack}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>Volver
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {builder.step === 1 && (
          <DropZone onImageLoad={builder.loadImage} />
        )}

        {builder.step === 2 && (
          <FieldEditor
            image={builder.image}
            naturalWidth={builder.naturalWidth}
            naturalHeight={builder.naturalHeight}
            fields={builder.fields}
            selectedField={builder.selectedField}
            zoom={builder.zoom}
            onAddField={builder.addField}
            onUpdateField={builder.updateField}
            onDeleteField={builder.deleteField}
            onSelectField={builder.selectField}
            onZoomChange={builder.setZoom}
            onPreview={() => setShowPreview(true)}
            onNextStep={() => builder.setStep(3)}
          />
        )}

        {builder.step === 3 && (
          <ExportPanel
            fields={builder.fields}
            image={builder.image}
            naturalWidth={builder.naturalWidth}
            naturalHeight={builder.naturalHeight}
            onBack={builder.goBack}
          />
        )}
      </main>

      {showPreview && (
        <PreviewModal
          image={builder.image}
          fields={builder.fields}
          naturalWidth={builder.naturalWidth}
          naturalHeight={builder.naturalHeight}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}