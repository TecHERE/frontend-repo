import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function Room() {
  const { roomId } = useParams();
  const { nickname } = useLocation().state;
  return <div></div>;
}
