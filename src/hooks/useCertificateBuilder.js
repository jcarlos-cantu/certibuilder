import { useState, useCallback } from 'react';

const DEFAULT_SIZES = {
  name: { w: 200, h: 40 },
  photo: { w: 120, h: 120 },
  category: { w: 180, h: 40 },
};

const DEFAULT_TEXT_STYLE = {
  color: '#ffffff',
  font: 'system-ui',
  fontsize: 16,
};

export function useCertificateBuilder() {
  const [image, setImage] = useState(null);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [step, setStep] = useState(1);

  const loadImage = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      const img = new Image();
      img.onload = () => {
        setNaturalWidth(img.naturalWidth);
        setNaturalHeight(img.naturalHeight);
        setStep(2);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, []);

  const addField = useCallback((x, y, type) => {
    const d = DEFAULT_SIZES[type];
    const ts = DEFAULT_TEXT_STYLE;
    const newField = {
      id: crypto.randomUUID(),
      type,
      x,
      y,
      w: d.w,
      h: d.h,
      color: ts.color,
      font: ts.font,
      fontsize: ts.fontsize,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
    return newField.id;
  }, []);

  const updateField = useCallback((id, updates) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const deleteField = useCallback((id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSelectedFieldId((prev) => (prev === id ? null : prev));
  }, []);

  const selectField = useCallback((id) => {
    setSelectedFieldId(id);
  }, []);

  const goBack = useCallback(() => {
    setStep((prev) => {
      if (prev === 2) {
        resetBuilder();
        return 1;
      }
      if (prev === 3) return 2;
      return prev;
    });
  }, []);

  const resetBuilder = useCallback(() => {
    setImage(null);
    setNaturalWidth(0);
    setNaturalHeight(0);
    setFields([]);
    setSelectedFieldId(null);
    setZoom(100);
  }, []);

  return {
    image,
    naturalWidth,
    naturalHeight,
    fields,
    selectedFieldId,
    selectedField: fields.find((f) => f.id === selectedFieldId) || null,
    zoom,
    step,
    loadImage,
    addField,
    updateField,
    deleteField,
    selectField,
    setZoom,
    setStep,
    goBack,
    resetBuilder,
  };
}
