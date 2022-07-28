import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProForm,
  ModalForm,
} from '@ant-design/pro-components';
import { categorys, units, warehouses } from '@/services/ant-design-pro/api';
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
  values: Partial<API.GoodListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  console.log(props.values.id);
  return (
    <ModalForm
      visible={props.updateModalVisible}
      modalProps={{
        onCancel: () => {
          props.onCancel();
        },
        destroyOnClose: true,
      }}
      onFinish={props.onSubmit}
    >
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.searchTable.ruleName" defaultMessage="请输入货品名称" />
              ),
            },
          ]}
          width="sm"
          name="name"
          label="货品名称"
          initialValue={props.values.name}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.numberName" defaultMessage="请输入编号" />
              ),
            },
          ]}
          width="sm"
          name="number"
          label="编号"
          initialValue={props.values.number}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.batchName" defaultMessage="请输入批次号" />
              ),
            },
          ]}
          width="sm"
          name="batch"
          label="批次号"
          initialValue={props.values.batch}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.priceName" defaultMessage="请输入价格" />
              ),
            },
          ]}
          width="sm"
          name="price"
          label="价格"
          initialValue={props.values.price}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.quantityName" defaultMessage="请输入数量" />
              ),
            },
          ]}
          width="sm"
          name="quantity"
          label="数量"
          initialValue={props.values.quantity}
        />
        <ProFormSelect
          name="unit"
          label="单位"
          request={units}
          width="sm"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.unitName" defaultMessage="请选择单位" />
              ),
            },
          ]}
          initialValue={props.values.unit?.id}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.specName" defaultMessage="请输入规格" />
              ),
            },
          ]}
          width="sm"
          name="spec"
          label="规格"
          initialValue={props.values.spec}
        />
        <ProFormSelect
          name="category"
          label="分类"
          request={categorys}
          width="sm"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.categoryName" defaultMessage="请选择分类" />
              ),
            },
          ]}
          initialValue={props.values.category?.id}
        />
        <ProFormSelect
          name="warehouse"
          label="仓库"
          request={warehouses}
          width="sm"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.goods.form.warehouseName" defaultMessage="请选择仓库" />
              ),
            },
          ]}
          initialValue={props.values.warehouse?.id}
        />
      </ProForm.Group>
      <ProFormTextArea width="md" name="remark" label="备注" initialValue={props.values.remark} />
    </ModalForm>
  );
};

export default UpdateForm;
