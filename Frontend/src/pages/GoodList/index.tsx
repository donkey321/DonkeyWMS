import {
  addRule,
  removeRule,
  goods,
  updateRule,
  categorys,
  units,
  warehouses,
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  console.log('fields', fields);
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.GoodListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.nameLabel"
          defaultMessage="货品名称"
        />
      ),
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.numberLabel"
          defaultMessage="编号"
        />
      ),
      dataIndex: 'number',
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.batchLabel"
          defaultMessage="Description"
        />
      ),
      dataIndex: 'batch',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.categoryLabel"
          defaultMessage="类别"
        />
      ),
      dataIndex: 'category',
      renderText: (category) => `${category.name}`,
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.quantityLabel"
          defaultMessage="数量"
        />
      ),
      dataIndex: [],
      renderText: (item) => {
        return `${item.quantity} ${item.unit.name}`;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.goods.searchTable.updateForm.specLabel" defaultMessage="规格" />
      ),
      dataIndex: 'spec',
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.priceLabel"
          defaultMessage="单价"
        />
      ),
      dataIndex: 'price',
      renderText: (price) => `${price}元`,
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.remarkLabel"
          defaultMessage="备注"
        />
      ),
      dataIndex: 'remark',
    },
    {
      title: (
        <FormattedMessage
          id="pages.goods.searchTable.updateForm.warehouseLabel"
          defaultMessage="仓库"
        />
      ),
      dataIndex: 'warehouse',
      renderText: (warehouse) => `${warehouse.name}`,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.goods.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />{' '}
            <FormattedMessage id="pages.searchTable.addGood" defaultMessage="新增库存" />
          </Button>,
        ]}
        request={goods}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.addGood',
          defaultMessage: '新增库存',
        })}
        // width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log('value', value);
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.ruleName"
                    defaultMessage="请输入货品名称"
                  />
                ),
              },
            ]}
            width="sm"
            name="name"
            label="货品名称"
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
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.goods.form.quantityName"
                    defaultMessage="请输入数量"
                  />
                ),
              },
            ]}
            width="sm"
            name="quantity"
            label="数量"
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
                  <FormattedMessage
                    id="pages.goods.form.categoryName"
                    defaultMessage="请选择分类"
                  />
                ),
              },
            ]}
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
                  <FormattedMessage
                    id="pages.goods.form.warehouseName"
                    defaultMessage="请选择仓库"
                  />
                ),
              },
            ]}
          />
        </ProForm.Group>
        <ProFormTextArea width="md" name="remark" label="备注" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
