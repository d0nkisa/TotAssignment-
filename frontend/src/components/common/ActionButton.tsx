import React from 'react';

interface ActionButtonInterface {
    action: (event: React.FormEvent) => Promise<void>
    buttonText: string
}

const ActionButton: React.FC<ActionButtonInterface> = ({ action, buttonText }) => {

  return (
    <button type='submit' onClick={action}>{buttonText}</button>
  );
};

export default ActionButton;