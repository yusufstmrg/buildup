// src/components/admin/EditableText.tsx
import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';

/**
 * EditableText renders static content when not in edit mode and a textarea when edit mode is enabled.
 * It synchronises its value with CmsContext using the provided `id`.
 */
interface Props {
  id: string; // unique identifier for this piece of content
  default?: string; // fallback content when no saved value exists
  className?: string;
}

export const EditableText: React.FC<Props> = ({ id, default: defaultContent = '', className }) => {
  const { state, updateContent } = useCms();
  const isEdit = state.editMode;
  const saved = state.content[id] ?? defaultContent;
  const [value, setValue] = useState<string>(saved);

  // Keep local state in sync when context changes (e.g., load from storage)
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
      className={className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      rows={2}
    />
  );
};
