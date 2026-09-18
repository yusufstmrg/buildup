// src/components/admin/SectionManager.tsx
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useCms } from '../../context/CmsContext';

export const SectionManager: React.FC = () => {
  const { state, reorderSections, toggleSection } = useCms();

  if (!state.editMode) return null;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(state.sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderSections(items);
  };

  return (
    <div className="fixed left-4 top-16 w-72 bg-slate-900 border border-brand-border rounded-xl shadow-2xl p-4 z-[999]">
      <h3 className="text-brand-gold font-bold text-lg mb-4">Manage Sections</h3>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {state.sectionOrder.map((section, index) => {
                const isVisible = state.visibleSections[section] !== false;
                
                return (
                  <Draggable key={section} draggableId={section} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          snapshot.isDragging 
                            ? 'bg-slate-800 border-brand-gold' 
                            : 'bg-slate-800/50 border-slate-700'
                        }`}
                      >
                        <span className="text-sm text-slate-200 capitalize font-medium">
                          {section}
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isVisible}
                              onChange={(e) => toggleSection(section, e.target.checked)}
                              className="w-4 h-4 text-brand-gold bg-slate-900 border-slate-600 rounded focus:ring-brand-gold focus:ring-offset-slate-900"
                            />
                            <span className="ml-2 text-xs text-slate-400">
                              {isVisible ? 'Show' : 'Hide'}
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
