import React from 'react';

const SmallText = (props: { type?: string; name: string; value: string }) => (
  <input {...props} />
);
const LargeText = (props: { name: string; value: string }) => <textarea {...props} />;

interface IElements {
  large: JSX.IntrinsicElements['textarea'];
  small: JSX.IntrinsicElements['input'];
  link: JSX.IntrinsicElements['input'];
  email: JSX.IntrinsicElements['input'];
}

export type DynamicInputElementProps = {
  kind: keyof IElements;
  type?: 'text' | 'url' | 'email';
  name: string;
  value: string;
};

const DynamicInputElement = (props: DynamicInputElementProps) => {
  if (props.kind === 'large') return <LargeText {...props} />;

  return <SmallText {...props} />;
};

export const isKindValid = (kind: string) =>
  kind === 'small' || kind === 'large' || kind === 'email' || kind === 'link';

export default DynamicInputElement;
