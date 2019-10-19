import cx from 'classnames';
import React from 'react';
import { callAll } from '../lib/fn-lib';
import { FieldContext } from './field-context';

export type InputProps = {
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue?: (value: string) => void;
  size?: 'lg' | 'sm';
} & JSX.IntrinsicElements['input'];

/**
 * `Input` is a wrapper around `input` element.
 *
 * It accepts all props an `input` element in addition of the stated props.
 *
 * `ref` will be forwarded to the underlying `input` element.
 *
 * Most of the time you want to wrap this within `Field` component so it will provides
 * contextual styling and good defaults on props
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, onChangeValue, onChange, size, ...inputProps },
    ref
  ) {
    const { inputId, setInputId } = React.useContext(FieldContext);

    React.useEffect(() => {
      if (inputProps.id && inputProps.id !== inputId) {
        setInputId(inputProps.id);
      }
    }, [inputProps.id, setInputId, inputId]);

    return (
      <input
        className={cx('form-control', size && `input-${size}`, className)}
        id={inputId}
        aria-describedby={`${inputId}-help`}
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.value))
        )}
        {...inputProps}
        ref={ref}
      />
    );
  }
);
