import React from 'react';
import { EditorProps } from '../../../../src';
import { Row } from '../../AllFeatures';

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'] as const;

export default function DropDownEditor({ row, onRowChange }: EditorProps<Row>) {
  return (
    <select
      className="rdg-text-editor"
      value={row.title}
      onChange={event => onRowChange({ ...row, title: event.target.value }, true)}
      autoFocus
    >
      {titles.map(title => (
        <option key={title} value={title}>{title}</option>
      ))}
    </select>
  );
}
