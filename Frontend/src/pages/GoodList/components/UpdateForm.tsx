import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-components';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <ModalForm
      visible={props.updateModalVisible}
      modalProps={{
        onCancel: () => {
          props.onCancel();
        },
      }}
      onFinish={() => {
        console.log(13838383838);
      }}
    >
      <ProFormText
        name="name"
        label={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleName.nameLabel',
          defaultMessage: '规则名称',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleName.nameRules"
                defaultMessage="请输入规则名称！"
              />
            ),
          },
        ]}
      />
      <ProFormTextArea
        name="desc"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
          defaultMessage: '规则描述',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
          defaultMessage: '请输入至少五个字符',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleDesc.descRules"
                defaultMessage="请输入至少五个字符的规则描述！"
              />
            ),
            min: 5,
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
