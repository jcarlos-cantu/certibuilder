export default function FieldMarker({
  field,
  isSelected,
  scaleX,
  scaleY,
  onMouseDown,
  onClick,
}) {
  const typeColors = {
    name: { border: 'border-blue-500', bg: 'bg-blue-500/20' },
    photo: { border: 'border-green-500', bg: 'bg-green-500/20' },
    category: { border: 'border-purple-500', bg: 'bg-purple-500/20' },
  };

  const { border, bg } = typeColors[field.type] || typeColors.name;

  return (
    <div
      className={`field-marker absolute border-2 border-dashed ${border} ${bg} cursor-move select-none ${
        isSelected ? 'ring-4 ring-green-400/50 shadow-lg' : ''
      }`}
      style={{
        left: field.x * scaleX,
        top: field.y * scaleY,
        width: field.w * scaleX,
        height: field.h * scaleY,
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: field.color,
        fontFamily: field.font,
        fontSize: Math.max(10, field.fontsize * scaleX) + 'px',
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {field.type === 'photo' ? (
        <i className="fa-solid fa-camera text-green-400" style={{ fontSize: '16px' }}></i>
      ) : (
        <span className="pointer-events-none truncate px-1">
          {field.type === 'name' ? 'Nombre' : 'Categoría'}
        </span>
      )}
    </div>
  );
}