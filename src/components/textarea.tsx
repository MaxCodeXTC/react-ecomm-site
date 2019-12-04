import cx from 'classnames';
import React from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps
} from 'react-textarea-autosize';
import { callAll } from '../lib/fn-lib';
import { isFunction } from '../lib/typecheck';
import { FieldContext } from './field-context';

type TextareaProps = Omit<TextareaAutosizeProps, 'ref'> & {
  /**
   * callback to be invoked when value change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue?: (value: string) => void;
};

/**
 * `Textarea` is a wrapper around `textarea` element.
 *
 * It accepts all props an `textarea` element in addition of the stated props.
 *
 * `ref` will be forwarded to the underlying `textarea` element.
 *
 * Most of the time you want to wrap this within `Field` component so it will provides
 * contextual styling and good defaults on props
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, minRows = 3, onChangeValue, onChange, ...textareaProps },
    forwardedRef
  ) {
    const { inputId, setInputId } = React.useContext(FieldContext);
    React.useEffect(() => {
      if (textareaProps.id && textareaProps.id !== inputId) {
        setInputId(textareaProps.id);
      }
    }, [textareaProps.id, inputId, setInputId]);

    return (
      <TextareaAutosize
        className={cx('form-control', className)}
        minRows={minRows}
        id={inputId}
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.value))
        )}
        {...textareaProps}
        inputRef={ref => {
          if (isFunction(forwardedRef)) {
            forwardedRef(ref);
          } else {
            if (forwardedRef) {
              (forwardedRef as React.MutableRefObject<
                HTMLTextAreaElement
              >).current = ref;
            }
          }
        }}
      />
    );
  }
);