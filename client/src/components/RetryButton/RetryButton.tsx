import React from 'react';
import { Button } from '@material-ui/core';

interface RetryButtonProps {
  onClick(): void;
}

const RetryButton: React.FC<RetryButtonProps> = ({ onClick }) => (
  <Button onClick={onClick}>
    Retry
  </Button>
);

export default RetryButton;
