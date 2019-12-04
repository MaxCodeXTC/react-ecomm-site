import cx from 'classnames';
import $ from 'jquery';
import * as React from 'react';
import '../lib/jquery.datepick.package-5.1.0/css/jquery.datepick.css';
import '../lib/jquery.datepick.package-5.1.0/js/jquery.datepick';
import styles from './date-input.module.css';
import { Input, InputProps } from './input';

type DateInputProps = InputProps & {
  /**
   * Format of the date for display and value
   *
   * @default 'dd-mm-yyyy';
   */
  dateFormat?: string;
  value?: string;
};

export const DateInput = ({
  dateFormat = 'dd-mm-yyyy',
  className,
  onChangeValue,
  value,
  ...props
}: DateInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeValueRef = React.useRef(onChangeValue);
  onChangeValueRef.current = onChangeValue;

  const getDateValue = React.useCallback(
    (date: Date) => {
      return $.datepick.formatDate(dateFormat, date);
    },
    [dateFormat]
  );

  React.useEffect(() => {
    $(inputRef.current as HTMLInputElement).datepick({
      dateFormat,
      onSelect: dates => {
        if (onChangeValueRef.current) {
          onChangeValueRef.current(getDateValue(dates[0]));
        }
      }
    });
  }, [dateFormat, getDateValue]);

  React.useEffect(() => {
    const $input = $(inputRef.current as HTMLInputElement);

    const currentValue = getDateValue($input.datepick('getDate')[0]);

    if (!value) {
      if (currentValue) {
        $input.datepick('clear');
      }
    } else if (value !== currentValue) {
      $input.datepick('setDate', value);
    }
  }, [value, getDateValue]);

  return (
    <Input
      className={cx(styles.input, className)}
      readOnly
      {...props}
      ref={inputRef}
    />
  );
};