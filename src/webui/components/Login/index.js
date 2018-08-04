import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Dialog, Input, Alert} from 'element-react';

const LoginModal = ({visibility, error, onCancel, onChange, onSubmit}) => {
  return (
    <Dialog
      title="Login"
      size="tiny"
      visible={visibility}
      onCancel={() => onCancel()}
    >
      <Form className="login-form">
        <Dialog.Body>
          {error.type && (
            <Alert
              title={error.title}
              type={error.type}
              description={error.description}
              showIcon={true}
              closable={false}
            />
          )}
          <br />
          <Input
            name="username"
            placeholder="Username"
            onChange={(value) => onChange('username', value)}
          />
          <br />
          <br />
          <Input
            name="password"
            type="password"
            placeholder="Type your password"
            onChange={(value) => onChange('password', value)}
          />
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={() => onCancel()} className="cancel-login-button">
            Cancel
          </Button>
          <Button
            nativeType="submit"
            className="login-button"
            onClick={(event) => onSubmit(event)}
          >
            Login
          </Button>
        </Dialog.Footer>
      </Form>
    </Dialog>
  );
};

LoginModal.propTypes = {
  visibility: PropTypes.bool,
  error: PropTypes.object,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default LoginModal;
