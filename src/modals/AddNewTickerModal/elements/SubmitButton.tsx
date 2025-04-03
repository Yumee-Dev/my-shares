import { useState, useEffect } from "react";
import { Button, Form } from "antd";

import type { PropsWithChildren, FC } from "react";
import type { FormInstance } from "antd";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <We need to call effect on every values change>
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export default SubmitButton;
