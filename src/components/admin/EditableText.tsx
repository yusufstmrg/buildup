import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';

interface Props {
  id: string;
  default?: string;
  className?: string;
}

export const EditableText: React.FC<Props> = ({ id, default: defaultContent = '', className }) => {
  const { state, updateContent } = useCms();
  const isEdit = state.editMode;
  const saved = state.content[id] ?? defaultContent;
  const [value, setValue] = useState<string>(saved);

  useEffect(() => {
    setValue(state.content[id] ?? defaultContent);
  }, [state.content, id, defaultContent]);

  const handleBlur = () => {
    updateContent(id, value);
  };

  if (!isEdit) {
    return <span className={className}>{saved}</span>;
  }

  return (
    <textarea
      className={className + " border-2 border-dashed border-brand-gold bg-brand-surface text-brand-textMain p-1 rounded min-h-[30px] w-full resize-y"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onClick={(e) => e.stopPropagation()}
      rows={1}
      style={{ minHeight: '1lh' }}
    />
  );
};
