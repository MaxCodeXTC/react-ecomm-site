import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { Textarea } from '../../../components/textarea';
import { RootState } from '../../../type';
import { selectUser } from '../../auth/auth.selectors';
import { useAddProductComment } from '../product.queries';

type ReduxProps = ConnectedProps<typeof connector> & { productId: number };

function ProductCommentFormContent({ productId, user }: ReduxProps) {
  const defaultName = (user && user.name) || '';
  const [userName, setUserName] = React.useState(defaultName);
  const [content, setContent] = React.useState('');
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const contentInputRef = React.useRef<HTMLTextAreaElement>(null);
  const [mutate, { status }] = useAddProductComment(productId);
  const submitting = status === 'loading';

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    mutate({
      userName,
      content,
      productId,
      createdOn: Date.now(),
    }).then(() => {
      setContent('');
      setUserName(defaultName);
      if (defaultName) {
        contentInputRef.current?.focus();
      } else {
        nameInputRef.current?.focus();
      }
    });
  }

  return (
    <Form title="Add Your Review" onSubmit={handleSubmit}>
      <TextField
        label="Your Name"
        value={userName}
        onChangeValue={setUserName}
        disabled={submitting}
        required
        ref={nameInputRef}
      />
      <Field>
        <Label>Your Review</Label>
        <Textarea
          id="product-comment-form-content"
          value={content}
          onChangeValue={setContent}
          minRows={3}
          disabled={submitting}
          required
          ref={contentInputRef}
        />
      </Field>
      <div>
        {submitting ? (
          <Spinner />
        ) : (
          <Button
            color="primary"
            type="submit"
            data-testid="product-comment-submit-btn"
          >
            Add
          </Button>
        )}
      </div>
    </Form>
  );
}

const mapStates = (state: RootState) => ({
  user: selectUser(state),
});

const connector = connect(mapStates);

export const ProductCommentForm = connector(ProductCommentFormContent);
